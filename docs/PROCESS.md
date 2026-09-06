# PROCESS — bblog (b-hub 연동 업데이트 · 보안 · admin 제거 · 리팩토링)

> 베이스 룰: `~/.claude/convention/*`. 합의: [docs/acknowledge/2026-07-10-hub-sync-decisions.md](./acknowledge/2026-07-10-hub-sync-decisions.md)
> 패키지매니저: **pnpm** (bun 아님 — 환경 일관성 원칙). 커밋: 영어 명령형 평문, 브랜치 vercel.

## 작업 1 — 의존성 최신화 · 기준선 검증 (Phase 1)

- [x] a. pnpm 으로 전체 의존성 최신화 (typescript 5.x 유지 · @types/node major 유지, lucide-react 1.x 등 major 는 공식 문서 확인 후 마이그레이션)
- [x] b. next 16 최신(16.2.x) + React Compiler 활성 유지 확인
- [x] c. 검증: `pnpm exec tsc --noEmit` → `pnpm build`
- [x] d. 커밋 (영어 평문)

## 작업 2 — 보안 (Phase 2)

- [x] a. Workflow(opus·xhigh) 심층 보안 감사
- [x] b. `/api/revalidate` · `/api/revalidate/path` 무인증 수정 (시크릿 또는 세션 검증)
- [x] c. 감사 발견 이슈 중 심각·운영 지장 이슈 즉시 수정
- [x] d. 리포트를 docs/ 에 기록 + 커밋

## 작업 3 — admin 페이지 제거 (Phase 4)

- [x] a. `app/admin/` (page + role 게이트 layout) 제거
- [x] b. `widgets/admin/` 5개 컴포넌트 제거 (admin-panel · admin-sidebar · comments-table · posts-table · users-table)
- [x] c. `entities/admin.client.ts`(훅 8개) + `entities/admin.ts` 제거
- [x] d. `lib/constants.ts` 의 QUERY_KEY.ADMIN 제거
- [x] e. 고아가 되는 `ui/sidebar.tsx` · `ui/table.tsx` 제거
- [x] f. 검증(tsc + build) 후 커밋

## 작업 4 — 컨벤션 리팩토링 (Phase 4, 합의 11번)

- [x] a. useCallback 제거 4파일 (features/editor/hooks/use-content-editable · use-shortcuts · use-history · use-keyboard-handler) — React Compiler 위임
- [x] b. barrel 제거 (features/editor/hooks/index.ts · utils/index.ts) — 직접 경로 import 로 전환
- [x] c. QUERY_KEY 전부 배열화 + POST.LIST 파라미터 정렬 직렬화
- [x] d. queryOptions 팩토리 도입 (entities/*.client.ts) + useQuery 수동 제네릭 제거
- [x] e. interface → type 전환 (HTML 속성 확장 제외)
- [x] f. TanstackQueryProvider staleTime 60_000 명시
- [x] g. dead code 제거: entities/log.* · entities/admin.ts 미사용 서버함수 · 빈 shared/ · components/ 잔재 · 주석 1건(app/api/revalidate/route.ts)
- [x] h. 검증 후 커밋

## 작업 5 — 에디터 undo 시 "undefined" 버그 수정 (2026-09-06)

- [x] a. 원인 분석 — use-history 의 배열/인덱스 분리 상태가 500개 상한에서 어긋나 `history[index-1]` 이 undefined (상세: [docs/bug/2026-09-06-editor-undo-undefined.md](./bug/2026-09-06-editor-undo-undefined.md))
- [x] b. 재현 — 수정 전 훅을 브라우저 하네스로 520타 후 undo → undefined 확인 ([docs/utils/editor-history-repro-harness.md](./utils/editor-history-repro-harness.md))
- [x] c. 수정 — useHistory 를 단일 ref `{ entries, index }` 로 재작성(대기 저장 flush · isUndoRedo 제거), useShortcuts 의 undo/redo 중복 경로 제거, edit 페이지는 로드 완료 후 Editor 마운트
- [x] d. 검증 — 하네스 3개 시나리오 수정 후 정상, tsc · prettier · next build 통과
- [x] e. 커밋·푸시·머지 — fix 4599bc8 + docs 커밋을 fix/editor-undo-history 브랜치에서 PR 로 vercel 에 머지

## 진행 로그

- 2026-07-10: 정찰 완료(기준선 tsc PASS · 테스트 없음), 합의 문서 기록, 체크리스트 작성.
- 2026-07-10: 작업 1 완료 — 의존성 최신화(lucide 1.24 무변경 판정 · hast className 타입 대응) · tsc/build 통과 · 커밋 c196c60.
- 2026-07-10: 보안 감사 완료(BBLOG-1/2 medium 확정). revalidate 라우트 세션 검증 + credentials·경로 화이트리스트 근본수정. 커밋 68db494. 리포트: docs/security-audit-2026-07-10.md
- 2026-07-10: 작업 3(admin 제거) 완료 — 11개 파일 삭제 + QUERY_KEY.ADMIN 제거, tsc/build 통과. 커밋 0e346de. followUp: use-mobile.ts·ui/sheet.tsx 전이 고아(범용 프리미티브, 정리는 선택).
- 2026-07-10: 작업 4(컨벤션 리팩토링) 완료 — useCallback/barrel 제거, QUERY_KEY 배열화+CACHE_TAG 분리, queryOptions 팩토리, interface→type, dead code. tsc/build 통과. 커밋 82dd88c.
- 2026-07-10: docs 검수 — 4개 작업 전부 완료(체크박스 정합). 코드 실측으로 확인: admin 트리 부재(app/admin·widgets/admin·entities/admin.* 없음), revalidate 두 라우트에 getServerSession 게이트 유지, 트리거 4파일(post·comment·category·tag client)에 credentials:'include' 유지, CACHE_TAG 분리, staleTime 60_000 명시, queryOptions 팩토리 6곳. 잔존 useCallback 4건은 vendored ui/carousel.tsx(shadcn)로 리팩토링 범위 밖. 보안 리포트의 admin 참조는 감사 시점(admin 제거 이전) 스냅샷 — 리포트 말미에 정합 주석 보강.
- 2026-09-06: 작업 5(에디터 undo undefined 버그) 완료 — use-history ref 재작성 + 단축키 중복 제거 + edit 페이지 초기화 게이트. 하네스 재현·검증, tsc/prettier/build 통과. 커밋 4599bc8(fix) + docs 커밋, PR 로 vercel 에 머지.

## 미결·후속 (이번 범위 밖, 선택)

> 합의 6번(운영 지장 이슈만 즉시 수정)에 따라 아래 low/info 는 의도적으로 이번 세션에서 제외했다. 상세는 [docs/security-audit-2026-07-10.md](./security-audit-2026-07-10.md).

- [ ] BBLOG-3 [low] 보안 헤더/CSP 부재 (next.config.ts headers() 없음, 현재도 미적용) — 하드닝.
- [ ] BBLOG-4 [low] 전이 의존성 취약점 3건(defu·mdast-util-to-hast·postcss) — package.json 에 overrides 미추가(현행 유지). 정기 갱신 대상.
- [ ] BBLOG-6 [info] user-card 외부 링크 rel='noopener' 누락(현재도 target='_blank'만) — 신뢰 정적 URL이라 실위험 없음.
- [ ] revalidate 인가를 admin/author role 로 좁히는 강화(현재 로그인 사용자 전원 허용) — 흐름 변경이라 별도 단계.
