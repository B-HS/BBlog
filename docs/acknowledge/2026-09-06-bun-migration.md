# 합의 — 패키지매니저 pnpm → bun 전환, Vercel Web Analytics 도입 (2026-09-06)

사용자가 2026-09-06 세션에서 직접 확정했다.

## 결정 사항

1. 패키지매니저를 **bun 으로 완전 전환**한다. `bun install` 이 `pnpm-lock.yaml` 을 마이그레이션해 `bun.lock` 을 생성했고(의존성 버전 유지), `pnpm-lock.yaml` 과 `package.json` 의 `pnpm` 필드는 제거한다. 이후 로컬·Vercel 모두 bun 으로 설치·빌드한다. (2026-07-10 합의의 "pnpm 유지" 를 이 결정이 대체한다)
2. **Vercel Web Analytics** 를 도입한다. `@vercel/analytics` 를 추가하고 루트 레이아웃(`app/layout.tsx`) `body` 끝에 `@vercel/analytics/next` 의 `<Analytics />` 를 둔다. 기존 Google Analytics · GTM 은 그대로 유지한다.
3. 검증 명령은 bun 기준으로 바뀐다: `bun run build`, `node_modules/.bin/tsc --noEmit`, `bunx prettier@3 --check <files>`.
4. **커밋은 `vercel` 브랜치에 직접** 한다. 별도 브랜치·PR 없이 vercel 에 커밋하고 푸시한다(사용자 지시: "그냥 vercel 에 바로 머지"). 커밋 형식(type 접두 + 영어 설명, AI 트레일러 금지, 선별 스테이징)은 그대로 유지한다.
5. **`bun.lock` 은 `lockfileVersion: 1` 을 유지**한다. Vercel 빌드 이미지의 bun(1.3.14)이 v2 를 읽지 못하기 때문이다. 근거·재생성 절차: [docs/bug/2026-09-06-vercel-bun-lockfile-version.md](../bug/2026-09-06-vercel-bun-lockfile-version.md)
