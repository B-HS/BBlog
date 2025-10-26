import { useCallback, type RefObject } from 'react'

interface UseKeyboardHandlerProps {
    editorRef: RefObject<HTMLDivElement>
    onContentChange: (content: string) => void
    onCursorUpdate: () => void
    onUndo: () => void
    onRedo: () => void
    onHistoryAdd?: (content: string, immediate?: boolean) => void
    handleKeyboardShortcuts: (e: KeyboardEvent) => 'undo' | 'redo' | null
    isComposing?: boolean
}

export const useKeyboardHandler = (props: UseKeyboardHandlerProps) => {
    const { editorRef, onContentChange, onCursorUpdate, onUndo, onRedo, onHistoryAdd, handleKeyboardShortcuts, isComposing = false } = props

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            onCursorUpdate()

            const action = handleKeyboardShortcuts(e.nativeEvent)
            if (action === 'undo') {
                onUndo()
                return
            }
            if (action === 'redo') {
                onRedo()
                return
            }

            if (e.key === 'Enter' && !e.shiftKey && !isComposing) {
                e.preventDefault()

                const selection = window.getSelection()
                if (!selection || selection.rangeCount === 0) return

                const range = selection.getRangeAt(0)
                range.deleteContents()

                const br = document.createElement('br')
                const frag = document.createDocumentFragment()
                const textNode = document.createTextNode('\u200B')

                frag.appendChild(br)
                frag.appendChild(textNode)

                range.insertNode(frag)

                range.setStart(textNode, 0)
                range.collapse(true)
                selection.removeAllRanges()
                selection.addRange(range)

                setTimeout(() => {
                    if (editorRef.current) {
                        const text = editorRef.current.innerText
                        onContentChange(text)
                        onCursorUpdate()

                        if (onHistoryAdd) {
                            onHistoryAdd(text, true)
                        }
                    }
                }, 0)

                return
            }

            if (e.key === 'Tab') {
                e.preventDefault()

                const selection = window.getSelection()
                if (!selection || selection.rangeCount === 0) return

                const range = selection.getRangeAt(0)
                range.deleteContents()

                const tabNode = document.createTextNode('  ')
                range.insertNode(tabNode)

                range.setStartAfter(tabNode)
                range.collapse(true)
                selection.removeAllRanges()
                selection.addRange(range)

                if (editorRef.current) {
                    const text = editorRef.current.innerText
                    onContentChange(text)
                }
            }
        },
        [editorRef, onContentChange, onCursorUpdate, onUndo, onRedo, handleKeyboardShortcuts],
    )

    const handleKeyUp = useCallback(() => {
        onCursorUpdate()
        if (editorRef.current) {
            const text = editorRef.current.innerText
            onContentChange(text)
            onCursorUpdate()
        }
    }, [editorRef, onContentChange, onCursorUpdate])

    const handleClick = useCallback(() => {
        onCursorUpdate()
    }, [onCursorUpdate])

    return {
        handleKeyDown,
        handleKeyUp,
        handleClick,
    }
}
