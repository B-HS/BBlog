import { useCallback, useEffect, useRef } from 'react'
import { flushSync } from 'react-dom'

interface UseContentEditableProps {
    content: string
    onContentChange: (content: string) => void
    onHistoryAdd: (content: string, immediate?: boolean) => void
    onCursorUpdate: () => void
}

export const useContentEditable = (props: UseContentEditableProps) => {
    const { content, onContentChange, onHistoryAdd, onCursorUpdate } = props
    const editorRef = useRef<HTMLDivElement>(null)

    const handleInput = useCallback(() => {
        if (editorRef.current) {
            const text = editorRef.current.innerText
            onContentChange(text)
            onCursorUpdate()

            onHistoryAdd(text, false)
        }
    }, [onContentChange, onCursorUpdate, onHistoryAdd])

    const handleBlur = useCallback(() => {
        if (editorRef.current) {
            const text = editorRef.current.innerText
            onContentChange(text)
            onHistoryAdd(text, true)
        }
    }, [onContentChange, onHistoryAdd])

    const handlePaste = useCallback(
        (e: React.ClipboardEvent) => {
            e.preventDefault()

            const text = e.clipboardData.getData('text/plain')
            if (!text) return

            const selection = window.getSelection()
            if (!selection || selection.rangeCount === 0) return

            const range = selection.getRangeAt(0)
            range.deleteContents()

            const lines = text.split('\n')
            const fragment = document.createDocumentFragment()

            lines.forEach((line, index) => {
                if (index > 0) {
                    fragment.appendChild(document.createElement('br'))
                }
                if (line) {
                    fragment.appendChild(document.createTextNode(line))
                }
            })

            range.insertNode(fragment)

            range.collapse(false)
            selection.removeAllRanges()
            selection.addRange(range)

            if (editorRef.current) {
                const newText = editorRef.current.innerText
                flushSync(() => {
                    onContentChange(newText)
                    onHistoryAdd(newText, true)
                })
                onCursorUpdate()
            }
        },
        [onContentChange, onHistoryAdd, onCursorUpdate],
    )

    useEffect(() => {
        if (editorRef.current && document.activeElement !== editorRef.current) {
            editorRef.current.innerText = content
        }
    }, [content])

    return {
        editorRef,
        handleInput,
        handleBlur,
        handlePaste,
    }
}
