import { useRef } from 'react'

const HISTORY_LIMIT = 500
const HISTORY_SAVE_DEBOUNCE_MS = 100

export const useHistory = (initialContent: string) => {
    const historyRef = useRef({ entries: [initialContent], index: 0 })
    const pendingSaveRef = useRef<{ text: string; timer: ReturnType<typeof setTimeout> } | null>(null)

    const commitToHistory = (text: string) => {
        const { entries, index } = historyRef.current
        if (text === entries[index]) return

        const nextEntries = [...entries.slice(0, index + 1), text].slice(-HISTORY_LIMIT)
        historyRef.current = { entries: nextEntries, index: nextEntries.length - 1 }
    }

    const flushPendingSave = () => {
        if (!pendingSaveRef.current) return

        const { text, timer } = pendingSaveRef.current
        clearTimeout(timer)
        pendingSaveRef.current = null
        commitToHistory(text)
    }

    const addToHistory = (text: string, immediate = false) => {
        if (immediate) {
            flushPendingSave()
            commitToHistory(text)
            return
        }

        if (pendingSaveRef.current) clearTimeout(pendingSaveRef.current.timer)

        const timer = setTimeout(() => {
            pendingSaveRef.current = null
            commitToHistory(text)
        }, HISTORY_SAVE_DEBOUNCE_MS)
        pendingSaveRef.current = { text, timer }
    }

    const handleUndo = () => {
        flushPendingSave()

        const { entries, index } = historyRef.current
        if (index === 0) return null

        historyRef.current = { entries, index: index - 1 }
        return entries[index - 1]
    }

    const handleRedo = () => {
        flushPendingSave()

        const { entries, index } = historyRef.current
        if (index >= entries.length - 1) return null

        historyRef.current = { entries, index: index + 1 }
        return entries[index + 1]
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
