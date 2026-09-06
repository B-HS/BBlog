# 에디터 히스토리 훅 재현 하네스 (2026-09-06)

`features/editor/hooks/use-history.ts` 의 undo/redo 동작을 실제 브라우저의 React 런타임에서 수정 전·후로 비교하기 위해 쓴 일회성 하네스다. 프로젝트 외부(scratch 디렉토리)에서 실행하며 레포에는 이 문서만 남긴다.

## 절차

```bash
mkdir -p /tmp/repro && cd /tmp/repro
git -C <repo> show HEAD:features/editor/hooks/use-history.ts > use-history.old.ts
ln -sfn <repo>/node_modules node_modules
# 아래 repro.tsx · index.html 작성
bun build ./repro.tsx --outfile ./bundle.js --format iife --target browser --define 'process.env.NODE_ENV="development"'
python3 -m http.server 8765 --bind 127.0.0.1
# 브라우저에서 http://127.0.0.1:8765/index.html 열고 콘솔에서 runAll()
```

- `window.setTimeout`/`clearTimeout` 을 가짜 타이머로 바꾸고 `advance(ms)` 로 시간을 수동 진행한다. 백그라운드 탭의 타이머 스로틀(숨김 5분 후 분당 1회)에 영향받지 않고 즉시 끝난다.
- 타이머 콜백과 상태 갱신은 `flushSync` 로 동기 커밋해, 키 입력 사이에 React 가 렌더를 마친 실제 타이핑 상황을 결정적으로 재현한다.
- 각 시나리오는 별도 컴포넌트 인스턴스(별도 훅 인스턴스)로 격리된다.

## index.html

```html
<!doctype html>
<html><head><meta charset="utf-8"><title>use-history repro</title></head>
<body><pre id="out">idle</pre><div id="root"></div><script src="bundle.js"></script></body></html>
```

## repro.tsx

```tsx
import { useEffect, useRef, useState, type FC } from 'react'
import { flushSync } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { useHistory as useHistoryOld } from './use-history.old'
import { useHistory as useHistoryNew } from '/Users/hyunseokbyun/development/bblog/features/editor/hooks/use-history'

type FakeTimer = { id: number; at: number; fn: () => void }
let fakeTimers: FakeTimer[] = []
let fakeNow = 0
let nextTimerId = 1
const fakeSetTimeout = (fn: () => void, ms = 0) => {
    const id = nextTimerId++
    fakeTimers = [...fakeTimers, { id, at: fakeNow + ms, fn }]
    return id
}
const fakeClearTimeout = (id?: number) => {
    fakeTimers = fakeTimers.filter((timer) => timer.id !== id)
}
Object.assign(window, { setTimeout: fakeSetTimeout, clearTimeout: fakeClearTimeout })

const advance = (ms: number) => {
    const target = fakeNow + ms
    while (true) {
        const due = fakeTimers.filter((timer) => timer.at <= target).sort((a, b) => a.at - b.at || a.id - b.id)[0]
        if (!due) break
        fakeNow = due.at
        fakeTimers = fakeTimers.filter((timer) => timer.id !== due.id)
        flushSync(() => due.fn())
    }
    fakeNow = target
}

const describe = (value: string | null | undefined) => {
    if (value === null) return 'null'
    if (value === undefined) return 'undefined'
    return `string:${JSON.stringify(value).slice(0, 12)}(len ${value.length})`
}

type HistoryHook = typeof useHistoryOld

const Harness: FC<{ label: string; useHook: HistoryHook }> = ({ label, useHook }) => {
    const hook = useHook('')
    const latestRef = useRef(hook)
    latestRef.current = hook
    const [, setContent] = useState('')

    useEffect(() => {
        const type = (text: string) => {
            latestRef.current.addToHistory(text, false)
            flushSync(() => setContent(text))
        }
        const undo = () => {
            const result = latestRef.current.handleUndo()
            flushSync(() => setContent(result ?? ''))
            return result
        }
        const redo = () => {
            const result = latestRef.current.handleRedo()
            flushSync(() => setContent(result ?? ''))
            return result
        }
        const api = {
            capOverflow: (count: number) => {
                let text = ''
                for (let i = 0; i < count; i++) {
                    text += 'a'
                    type(text)
                    advance(110)
                }
                advance(150)
                const first = undo()
                const second = undo()
                return { firstUndo: describe(first), secondUndo: describe(second) }
            },
            fastTypeThenUndo: () => {
                type('a')
                advance(150)
                type('ab')
                type('abc')
                const undone = undo()
                advance(150)
                const redone = redo()
                return { undone: describe(undone), redone: describe(redone) }
            },
            undoThenTypeThenUndo: () => {
                type('a')
                advance(150)
                type('ab')
                advance(150)
                const firstUndo = undo()
                type('ax')
                advance(150)
                const secondUndo = undo()
                return { firstUndo: describe(firstUndo), secondUndo: describe(secondUndo) }
            },
        }
        Object.assign(window, { [label]: api })
    }, [label])

    return <div>{label} mounted</div>
}

type Api = { capOverflow: (count: number) => unknown; fastTypeThenUndo: () => unknown; undoThenTypeThenUndo: () => unknown }
const getApi = (label: string) => (window as unknown as Record<string, Api>)[label]

const runAll = () => {
    const results = {
        oldCap: getApi('oldCap').capOverflow(520),
        newCap: getApi('newCap').capOverflow(520),
        oldFast: getApi('oldFast').fastTypeThenUndo(),
        newFast: getApi('newFast').fastTypeThenUndo(),
        oldSwallow: getApi('oldSwallow').undoThenTypeThenUndo(),
        newSwallow: getApi('newSwallow').undoThenTypeThenUndo(),
        done: true,
    }
    Object.assign(window, { results })
    const out = document.getElementById('out')
    if (out) out.textContent = JSON.stringify(results, null, 2)
    return results
}
Object.assign(window, { runAll })

createRoot(document.getElementById('root')!).render(
    <>
        <Harness label='oldCap' useHook={useHistoryOld} />
        <Harness label='newCap' useHook={useHistoryNew} />
        <Harness label='oldFast' useHook={useHistoryOld} />
        <Harness label='newFast' useHook={useHistoryNew} />
        <Harness label='oldSwallow' useHook={useHistoryOld} />
        <Harness label='newSwallow' useHook={useHistoryNew} />
    </>,
)
```
