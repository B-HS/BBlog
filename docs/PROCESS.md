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

- [ ] a. useCallback 제거 4파일 (features/editor/hooks/use-content-editable · use-shortcuts · use-history · use-keyboard-handler) — React Compiler 위임
- [ ] b. barrel 제거 (features/editor/hooks/index.ts · utils/index.ts) — 직접 경로 import 로 전환
- [ ] c. QUERY_KEY 전부 배열화 + POST.LIST 파라미터 정렬 직렬화
- [ ] d. queryOptions 팩토리 도입 (entities/*.client.ts) + useQuery 수동 제네릭 제거
- [ ] e. interface → type 전환 (HTML 속성 확장 제외)
- [ ] f. TanstackQueryProvider staleTime 60_000 명시
- [ ] g. dead code 제거: entities/log.* · entities/admin.ts 미사용 서버함수 · 빈 shared/ · components/ 잔재 · 주석 1건(app/api/revalidate/route.ts)
- [ ] h. 검증 후 커밋

## 진행 로그

- 2026-07-10: 정찰 완료(기준선 tsc PASS · 테스트 없음), 합의 문서 기록, 체크리스트 작성.
- 2026-07-10: 작업 1 완료 — 의존성 최신화(lucide 1.24 무변경 판정 · hast className 타입 대응) · tsc/build 통과 · 커밋 c196c60.
- 2026-07-10: 보안 감사 완료(BBLOG-1/2 medium 확정). revalidate 라우트 세션 검증 + credentials·경로 화이트리스트 근본수정. 커밋 68db494. 리포트: docs/security-audit-2026-07-10.md
- 2026-07-10: 작업 3(admin 제거) 완료 — 11개 파일 삭제 + QUERY_KEY.ADMIN 제거, tsc/build 통과. 커밋 0e346de. followUp: use-mobile.ts·ui/sheet.tsx 전이 고아(범용 프리미티브, 정리는 선택).
