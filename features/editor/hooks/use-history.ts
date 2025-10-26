import { useState, useRef, useCallback } from 'react'

export const useHistory = (initialContent: string) => {
    const [history, setHistory] = useState<string[]>([initialContent])
    const [historyIndex, setHistoryIndex] = useState(0)
    const isUndoRedo = useRef(false)
    const lastSavedContent = useRef(initialContent)
    const saveTimer = useRef<NodeJS.Timeout | null>(null)

    const addToHistory = useCallback(
        (text: string, immediate = false) => {
            if (isUndoRedo.current) {
                isUndoRedo.current = false
                return
            }

            if (text === lastSavedContent.current) {
                return
            }

            if (saveTimer.current) {
                clearTimeout(saveTimer.current)
            }

            const saveToHistory = () => {
                setHistory((prev) => {
                    const newHistory = [...prev.slice(0, historyIndex + 1), text]

                    if (newHistory.length > 500) {
                        newHistory.shift()
                        return newHistory
                    }
                    return newHistory
                })
                setHistoryIndex((prev) => prev + 1)
                lastSavedContent.current = text
            }

            if (immediate) {
                saveToHistory()
            } else {
                saveTimer.current = setTimeout(saveToHistory, 100)
            }
        },
        [historyIndex],
    )

    const handleUndo = () => {
        if (historyIndex > 0) {
            isUndoRedo.current = true
            const newIndex = historyIndex - 1
            setHistoryIndex(newIndex)
            return history[newIndex]
        }
        return null
    }

    const handleRedo = () => {
        if (historyIndex < history.length - 1) {
            isUndoRedo.current = true
            const newIndex = historyIndex + 1
            setHistoryIndex(newIndex)
            return history[newIndex]
        }
        return null
    }

    const handleKeyboardShortcuts = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
            e.preventDefault()
            return 'undo'
        }
        if ((e.metaKey || e.ctrlKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
            e.preventDefault()
            return 'redo'
        }
        return null
    }

    return {
        addToHistory,
        handleUndo,
        handleRedo,
        handleKeyboardShortcuts,
    }
}
