# 보안 감사·수정 리포트 — bblog (2026-07-10)

> Workflow(opus·xhigh) 심층 감사 + medium 이상 적대적 검증 + 근본 수정.

## 감사 발견

### BBLOG-1 [medium] 무인증 임의 경로 캐시 무효화 엔드포인트 (/api/revalidate/path) (검증: real=True, 조정 severity=medium)
- 파일: `app/api/revalidate/path/route.ts` 4-14
- 설명: POST 핸들러가 세션/시크릿/오리진 검증 없이 body.path 문자열만 typeof 확인 후 곧바로 revalidatePath(path)를 호출한다. 인증이 전혀 없어 인터넷의 누구나 임의 경로의 ISR 캐시를 무효화할 수 있다. getPost/getPostList/기사 페이지가 revalidate 2592000~60초로 캐싱되는데 이 엔드포인트로 캐시를 상시 퍼지할 수 있다.
- 시나리오: 공격자가 while 루프로 curl -XPOST https://blog.gumyo.net/api/revalidate/path -d '{"path":"/"}' 반복 → '/', '/article', '/article/{id}' 등 임의 경로 캐시가 계속 stale 처리 → 이후 모든 방문자 요청마다 풀 SSR + hub API(getPost/getPostList) 재요청. ISR 캐싱이 무력화되어 hub 백엔드 부하 증폭 및 Vercel 함수 호출·대역폭 비용 증가(캐시 스탬피드). 데이터 노출은 없으나 가용성/비용 영향.
- 운영영향: 보안이자 운영 결함. 스크립트 한 줄로 ISR 캐시를 지속 무효화해 원본(hub) 과부하·Vercel 비용 급증을 유발할 수 있고 레이트리밋도 없다.

### BBLOG-2 [medium] 무인증 태그 캐시 무효화 엔드포인트 (/api/revalidate) — 마스터 퍼지 키 노출 (검증: real=True, 조정 severity=medium)
- 파일: `app/api/revalidate/route.ts` 5-35
- 설명: POST 핸들러가 tags를 QUERY_KEY의 문자열 값(imageList/categoryList/tagList/mainPostLists 4종)으로만 화이트리스트 검증하고 인증은 없다. getPost·getPostList·getAllPosts가 모두 tags:[QUERY_KEY.POST.MAIN]='mainPostLists'로 태깅되어(entities/post.ts) 이 태그 하나를 무효화하면 홈·기사목록·모든 기사 상세·sitemap 캐시가 통째로 퍼지된다. 즉 무인증 단일 호출이 사실상 전 블로그 콘텐츠 캐시의 마스터 퍼지 키로 작동한다.
- 시나리오: 공격자가 curl -XPOST https://blog.gumyo.net/api/revalidate -d '{"tags":["mainPostLists"]}' 반복 → 홈/목록/모든 상세/sitemap 캐시가 매번 무효화 → 방문자 요청마다 hub 재요청. BBLOG-1과 동일한 캐시 스탬피드/비용 증폭이 태그 경로로도 성립.
- 운영영향: 보안이자 운영 결함. 태그 검증은 있으나 인증이 없어 캐시 무효화 남용이 가능하고 mainPostLists가 광범위 태그라 영향 범위가 크다.

### BBLOG-3 [low] 보안 헤더/CSP 전면 부재
- 파일: `next.config.ts` 1-30
- 설명: middleware.ts 없음, next.config.ts에 headers() 없음, vercel.json 없음. 따라서 CSP(또는 Report-Only), X-Frame-Options/frame-ancestors, X-Content-Type-Options(nosniff), Referrer-Policy, HSTS 중 어느 것도 설정되지 않는다. 이 앱은 관리자 작성 마크다운(rehype-sanitize 처리)과 GA/GTM을 렌더한다. 마크다운은 sanitize+admin 전용 작성, 댓글/로그 body는 plain-text 렌더(React 자동 이스케이프)라 즉각 XSS는 낮지만, 방어심층이 비어 있어 클릭재킹·향후 sanitize 회피 시 완충장치가 없다.
- 시나리오: frame-ancestors/X-Frame-Options 부재로 blog.gumyo.net을 iframe에 임베드한 클릭재킹 가능(admin 세션에서 관리 UI가 열릴 때 UI redress). nosniff 부재로 MIME 스니핑 여지. 단독으로는 심각도 낮음(콘텐츠가 admin 전용·sanitize됨).
- 운영영향: 운영 영향 없음. 방어심층(하드닝) 미비 항목.

### BBLOG-4 [low] 의존성 취약점 미패치 (defu 프로토타입 오염 등 3건)
- 파일: `package.json` 1-60
- 설명: pnpm audit 결과 3건: (1) defu <=6.1.4 프로토타입 오염(GHSA-737v-mqg7-c878, high, better-auth>defu 경유), (2) mdast-util-to-hast <13.2.1 class 속성 미살균(GHSA-4fh9-h7wg-q85m, moderate, remark-rehype 경유로 런타임 파이프라인에 포함), (3) postcss <8.5.10 </style> 미이스케이프 XSS(GHSA-qx2v-qp2m-jg93, moderate, next>postcss, 빌드타임). 모두 전이 의존성이라 lockfile 갱신으로 해결 가능.
- 시나리오: 실제 악용도 낮음: defu는 better-auth 내부 설정 병합용이라 요청 body를 첫 인자로 넘기지 않음. mdast-util-to-hast 이슈는 code 클래스명 주입인데 rehype-sanitize가 code className을 /^language-/로 제한해 주입 토큰 제거 + 콘텐츠 admin 전용. postcss는 빌드타임 CSS 처리로 런타임 노출 아님. 이론적/저위험.
- 운영영향: 운영 영향 없음. 정기 의존성 갱신 대상.

### BBLOG-5 [info] sanitize 스키마에서 img/picture/source에 style 속성 허용
- 파일: `features/editor/markdown.tsx` 56-58
- 설명: rehype-sanitize 커스텀 스키마가 img/picture/source에 'style' 속성을 허용한다. 일반적으로 style 허용은 CSS 주입(오버레이/디페이스먼트) 여지가 있으나, 이 파이프라인은 (a) remarkRehype allowDangerousHtml:false로 원시 HTML 미통과, (b) 콘텐츠 작성이 admin 전용, (c) 출력이 rehypeReact로 렌더되는데 img는 style을 버리는 커스텀 컴포넌트로 치환되고 picture/source의 문자열 style은 React가 object가 아니면 무시하므로 실제로 렌더되지 않는다. 현재 구조상 악용 불가.
- 시나리오: 실현 불가(정보성). 향후 렌더러를 rehype-stringify 기반 raw HTML 출력으로 바꾸면 style 기반 CSS 주입이 활성화될 수 있으니 그때 재검토 필요.
- 운영영향: 없음.

### BBLOG-6 [info] target='_blank' 링크에 rel='noopener' 누락
- 파일: `features/common/user-card.tsx` 38
- 설명: user-card의 외부 링크가 target='_blank'만 지정하고 rel='noopener noreferrer'가 없다. 다만 URL이 정적 신뢰 상수(INFORMATION_LINKS)에서만 오고 최신 브라우저는 target=_blank에 noopener를 기본 적용하므로 reverse tabnabbing은 사실상 불가.
- 시나리오: 신뢰된 정적 URL만 사용 + 브라우저 기본 noopener로 실현 불가(정보성).
- 운영영향: 없음.

## 수정 내역

### BBLOG-1/2 — fixed
- 변경: 두 revalidate 라우트(app/api/revalidate/route.ts, app/api/revalidate/path/route.ts) 핸들러 진입부에서 lib/auth/session.ts 의 getServerSession() 으로 로그인 세션을 확인하고, 세션이 없으면 401(Unauthorized)을 반환하도록 게이트를 추가. path 라우트에는 추가로 ALLOWED_PATH_PREFIXES(['/article/'] as const) 화이트리스트를 두어 허용 프리픽스로 시작하지 않는 임의 경로는 400('path is not allowed')으로 거부. 트리거 측(entities/post.client.ts·comment.client.ts·admin.client.ts·tag.client.ts·category.client.ts)의 revalidate fetch 호출 13곳 전부에 credentials:'include' 를 추가해 same-origin 세션 쿠키가 함께 전송되도록 명시.
- 근본원인 해결: revalidate 라우트가 인증을 전혀 검사하지 않아 외부 무인증 요청이 ISR 캐시를 반복 무효화해 캐시 스탬피드/hub 과부하(DoS)를 유발할 수 있었음. 근본 원인은 '캐시 무효화라는 서버 측 상태변경 동작에 인가 경계가 없다'는 것이므로, 이미 서버 레이아웃(app/(editor)/layout.tsx·app/admin/layout.tsx)에서 검증된 동일 세션 확인 경로(getServerSession)를 재사용해 인가 경계를 세우고, path 라우트는 실제 사용되는 경로 네임스페이스(/article/*)로만 좁혀 인증된 사용자도 임의 경로를 퍼지할 수 없게 함.
- 파일: /Users/hyunseokbyun/bblog/app/api/revalidate/route.ts, /Users/hyunseokbyun/bblog/app/api/revalidate/path/route.ts, /Users/hyunseokbyun/bblog/entities/post.client.ts, /Users/hyunseokbyun/bblog/entities/comment.client.ts, /Users/hyunseokbyun/bblog/entities/admin.client.ts, /Users/hyunseokbyun/bblog/entities/tag.client.ts, /Users/hyunseokbyun/bblog/entities/category.client.ts

## 후속(followUps)

- path 화이트리스트는 현재 사용처(모두 /article/*)에 맞춰 '/article/' 프리픽스로 제한했다. 추후 다른 경로(예: 태그/카테고리 목록 페이지)를 revalidatePath 로 무효화할 필요가 생기면 ALLOWED_PATH_PREFIXES 에 항목을 추가해야 한다.
- revalidate 라우트는 현재 '로그인한 모든 사용자'를 허용한다(댓글 작성 등 정상 흐름 보존을 위해). 캐시 무효화를 admin/author 로만 한정하고 싶다면 세션 role 검사(session.user.role === 'admin' 등)로 강화하는 별도 단계가 필요하며, 이는 흐름 변경이라 이번 범위에서 제외했다.
- 지시대로 admin 페이지/코드 제거는 손대지 않았다(별도 단계).

## 검증
- typecheck: pnpm exec tsc --noEmit → exit 0 (오류 없음)
- test: 테스트 없음(레포에 테스트 스크립트/파일 부재). 대신 pnpm build → exit 0, Compiled successfully, 13/13 페이지 생성, /api/revalidate 와 /api/revalidate/path 모두 ƒ(Dynamic)으로 정상 컴파일. 런타임 인증 흐름은 코드로 확인: getServerSession 이 next/headers cookies()로 요청 쿠키를 읽어 hub /api/auth/get-session 으로 검증(동일 함수가 editor/admin 서버 레이아웃에서 이미 세션 게이트로 동작 중이라 블로그 도메인에 세션 쿠키 존재가 입증됨). 클라이언트 revalidate fetch 는 same-origin + credentials:'include' 로 같은 쿠키를 전달 → 로그인 흐름은 세션 있음으로 통과, 무인증 외부 요청은 세션 null → 401.

## 의존성 취약점
pnpm audit 실행 결과 총 3건 (high 1, moderate 2):
1) [HIGH] defu <=6.1.4 — 프로토타입 오염(CVE-2026-35209, GHSA-737v-mqg7-c878). 경로 .>better-auth>defu(6.1.4). 패치 >=6.1.5. 실제 악용도 낮음 — defu는 better-auth 내부 설정 병합용이고 요청 body를 첫 인자로 넘기지 않음. 그래도 high라 갱신 권장.
2) [MODERATE] mdast-util-to-hast <13.2.1 — class 속성 미살균(CVE-2025-66400, GHSA-4fh9-h7wg-q85m). 경로 .>rehype-stringify>hast-util-to-html>mdast-util-to-hast(13.2.0). 단 동일 취약 transform이 remark-rehype 경유로 실제 렌더 파이프라인에도 포함. 완화: rehype-sanitize가 code className을 /^language-/로 제한 + 콘텐츠 admin 전용이라 주입 클래스 제거됨. 패치 >=13.2.1.
3) [MODERATE] postcss <8.5.10 — </style> 미이스케이프 XSS(CVE-2026-41305, GHSA-qx2v-qp2m-jg93). 경로 .>next>postcss(8.4.31). 빌드타임 CSS 처리로 런타임 사용자 노출 아님. 패치 >=8.5.10.
조치: pnpm update 또는 pnpm.overrides로 defu>=6.1.5 / mdast-util-to-hast>=13.2.1 / postcss>=8.5.10 강제 후 재감사. (프로젝트가 pnpm-lock.yaml 사용 → pnpm audit로 실행, bun audit 아님)
