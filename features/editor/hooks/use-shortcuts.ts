import { useCallback } from 'react'

interface UseShortcutsProps {
    onBold: () => void
    onItalic: () => void
    onUnderline: () => void
    onStrikethrough: () => void
    onUndo: () => void
    onRedo: () => void
    isComposing?: boolean
}

export const useShortcuts = (props: UseShortcutsProps) => {
    const { onBold, onItalic, onUnderline, onStrikethrough, onUndo, onRedo, isComposing = false } = props

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (isComposing) return

            const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
            const modifierKey = isMac ? e.metaKey : e.ctrlKey

            if (modifierKey) {
                switch (e.key.toLowerCase()) {
                    case 'b':
                        e.preventDefault()
                        onBold()
                        break
                    case 'i':
                        e.preventDefault()
                        onItalic()
                        break
                    case 'u':
                        e.preventDefault()
                        onUnderline()
                        break
                    case 'd':
                        e.preventDefault()
                        onStrikethrough()
                        break
                    case 'z':
                        e.preventDefault()
                        if (e.shiftKey) {
                            onRedo()
                        } else {
                            onUndo()
                        }
                        break
                    default:
                        break
                }
            }
        },
        [isComposing, onBold, onItalic, onUnderline, onStrikethrough, onUndo, onRedo],
    )

    return handleKeyDown
}
