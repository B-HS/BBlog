# 에디터 Ctrl+Z 시 본문이 "undefined" 로 바뀌고 편집 기록이 사라지는 버그 (2026-09-06)

## 증상

글을 어느 정도 길게 쓴 뒤 Ctrl+Z(Mac 은 Cmd+Z)를 누르면 본문 전체가 문자열 `undefined` 로 바뀌고, 이후 undo/redo 가 정상 상태로 돌아오지 않는다.

## 대상 파일

- `features/editor/hooks/use-history.ts` (재작성)
- `features/editor/hooks/use-shortcuts.ts` (undo/redo 중복 경로 제거)
- `features/editor/editor.tsx` (useShortcuts 의 onUndo/onRedo 배선 제거)
- `app/(editor)/edit/[id]/page.tsx` (게시글 로드 완료 후 Editor 마운트)

## 원인

1. **히스토리 배열과 인덱스가 따로 관리되어 어긋남 (주원인).** `useHistory` 가 `history` 배열과 `historyIndex` 를 별도 `useState` 로 들고 있었다. 배열은 500개 상한에서 `shift()` 로 앞을 잘라내지만 인덱스는 무조건 `prev + 1` 로 증가해, 상한을 넘긴 순간부터 저장 1회마다 인덱스가 배열 길이를 1씩 초과한다. 이 상태에서 `handleUndo` 가 `history[historyIndex - 1]` 을 읽으면 `undefined` 가 나오고, 호출부는 `text !== null` 만 검사하므로 `undefined` 를 그대로 `innerText` 와 `setContent` 에 넣어 화면에 "undefined" 가 찍힌다. 디바운스가 100ms 라 일반 타자 속도(키 간격 약 200ms)에서는 키 하나가 항목 하나가 되므로, 500타 이상 쓴 글이면 반드시 발생한다.
2. `setHistory` 는 렌더 시점 클로저의 `historyIndex` 를, `setHistoryIndex` 는 함수형 업데이트를 써서 같은 렌더 안에서 저장이 2회 일어나면 역시 1씩 어긋났다.
3. `isUndoRedo` 플래그가 undo 직후 첫 편집을 히스토리에서 삼켰다. 프로그램적 `innerText` 대입은 `input` 이벤트를 발생시키지 않으므로 이 플래그는 애초에 필요 없었고, 오히려 undo 후 첫 타이핑·붙여넣기가 기록되지 않았다.
4. 타이핑 직후 100ms 안에 undo 하면 디바운스 타이머가 undo 이후에 발화해 되돌린 자리 위에 이전 텍스트를 덮어썼다.
5. Mac 에서 Cmd+Z 가 `useShortcuts` 와 `useKeyboardHandler`(`useHistory.handleKeyboardShortcuts`) 두 경로에서 각각 undo 를 호출했다. 기존 구현은 같은 렌더 클로저를 써서 우연히 결과가 같았지만, ref 기반으로 바꾸면 두 단계가 되돌아가므로 한 경로로 통일해야 했다.
6. 수정 페이지(`/edit/[id]`)는 게시글이 로드되기 전 빈 문자열로 Editor 를 마운트해 히스토리 기준점이 `''` 였다. 로드된 본문은 히스토리에 없어 undo 를 끝까지 하면 본문이 통째로 비었다.

## 해결

- `useHistory` 를 단일 `useRef({ entries, index })` 로 재작성했다. 히스토리는 렌더에 쓰이지 않으므로 state 가 아니라 ref 가 맞고, 배열과 인덱스를 한 객체로 원자적으로 교체해 어긋날 수 없다. 상한은 `slice(-HISTORY_LIMIT)` 로 비파괴 적용하고 인덱스는 항상 `entries.length - 1` 로 맞춘다.
- undo/redo 전에 대기 중인 디바운스 저장을 먼저 커밋(`flushPendingSave`)해, 방금 친 내용이 정확히 한 단계로 되돌아간다. 즉시 저장(붙여넣기·서식·이미지) 도 대기분을 먼저 커밋한 뒤 저장한다.
- `isUndoRedo` 플래그를 제거했다.
- undo/redo 단축키는 `useHistory.handleKeyboardShortcuts`(Ctrl/Cmd 모두 허용, Ctrl+Y 포함) 한 곳만 담당하고 `useShortcuts` 의 `z` 케이스를 제거했다.
- 수정 페이지는 `isInitialized` 가 true 가 된 뒤 PostForm 을 렌더해 로드된 본문이 히스토리 기준점이 되게 했다.

## 상세

- `HISTORY_LIMIT = 500`, `HISTORY_SAVE_DEBOUNCE_MS = 100` 은 기존 값을 상수로 올린 것이며 동작 변경은 없다.
- `commitToHistory` 는 현재 항목과 같은 텍스트는 저장하지 않는다(연속 중복 제거).
- 새 편집이 들어오면 `index` 이후의 redo 분기는 버린다(표준 동작).

## 검증 (2026-09-06)

에디터 라우트는 admin 세션이 필요해 로컬에서 실제 페이지를 띄울 수 없었다. 대신 수정 전 훅(git HEAD)과 수정 후 훅을 같은 React 19 런타임에 나란히 마운트한 브라우저 하네스로 재현·검증했다. 절차와 소스는 [docs/utils/editor-history-repro-harness.md](../utils/editor-history-repro-harness.md).

| 시나리오 | 수정 전 | 수정 후 |
|---|---|---|
| 520타 입력(키 간격 110ms) 후 undo 2회 | `undefined`, `undefined` | 519자, 518자 |
| 'a' 저장 후 'ab','abc' 를 100ms 안에 치고 undo → redo | `''` → 'abc' (한 단계 초과 복귀) | 'a' → 'abc' |
| 'ab' 에서 undo('a') 후 'ax' 입력, 다시 undo | `''` ('ax' 편집이 기록에서 누락) | 'a' |

기계 검증: `node_modules/.bin/tsc --noEmit` 통과(next-env.d.ts 생성 후 0 오류), `pnpm dlx prettier@3 --check` 변경 4파일 통과, `NEXT_PUBLIC_API_URL=https://example.invalid node_modules/.bin/next build` 통과. 프로젝트에 테스트 러너가 없어 자동 테스트는 추가하지 않았다.
