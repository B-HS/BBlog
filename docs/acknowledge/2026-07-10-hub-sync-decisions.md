# 합의 — b-hub 연동 일괄 업데이트 · 보안 · 고도화 (2026-07-10)

대상: hyun-hub(b-hub) + 클라이언트 6개(bblog · mail · bcalendar · Rirekisyo · storage · weather).
아래 결정은 사용자가 2026-07-10 세션에서 직접 확정했다.

## 결정 사항

1. 의존성은 전체 최신화한다. 단 typescript 는 5.x 최신 유지(7.0 보류), @types/node 는 현행 major 유지(런타임 정합).
2. 모든 Next.js 프로젝트는 16 최신 버전으로 올린다. lint 는 투자하지 않는다(`next lint` 제거 시 대체 미도입). React Compiler 미적용 프로젝트는 활성화한다.
3. hyun-hub 도 전체 최신화 대상이다(zod 4 · hono-openapi 1.x · zod-openapi 6 등 major 포함).
4. AI 기능(mail · bcalendar · Rirekisyo)은 멀티 프로바이더로 설계한다 — oMLX(OpenAI 호환) · OpenAI(Codex OAuth·access token) · Ollama Cloud · Anthropic. 상세 설계는 구현 전 별도 컨펌.
5. AI 키는 hub DB 에 사용자별 암호화 저장하고, AI 호출은 hub 가 프록시한다(브라우저에 키 비노출). 키 등록 UI 는 신설 /manage 에 둔다.
6. 보안은 심각 이슈뿐 아니라 운영에 지장이 조금이라도 있는 이슈면 즉시 수정한다.
7. 커밋은 각 레포 히스토리 스타일을 따른다. 이 레포는 기존 히스토리대로 **영어 명령형 평문 subject**(비-Conventional, 예: "Update dependencies to latest")로 작성한다. 글로벌 컨벤션 기본값(한국어 Conventional)과 다름을 사용자에게 고지·합의 완료.
8. 전 프로젝트에 docs/ 를 생성하고 PROCESS·리포트를 정식 기록한다.
9. storage 의 mimeFilter dead path 버그도 수정 범위에 포함한다.
10. bcalendar 의 드래그 시 groupId 소실 버그는 실패 테스트로 재현한 뒤 수정한다.
11. 기존 컨벤션 위반(useCallback · barrel · zustand · 코드 주석 등)은 이번에 전면 리팩토링한다.
12. 사용 가능한 단계마다 커밋한다(사용자 지시로 커밋 승인됨). AI 트레일러 금지, push 는 별도 요청 시에만.
13. 모든 major 업그레이드는 공식 문서(인터넷)를 확인한 후 진행한다.
14. 각 기능(admin UI 개선 · /manage · AI 인프라 · 클라이언트 AI · weather UI)은 구현 전 요약 설계로 사용자 컨펌을 받는다.
