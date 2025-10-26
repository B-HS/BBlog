import { type RefObject } from 'react'
import { getCursorPosition } from '../utils/get-cursor-position'

export const useWrapSelection = (editorRef: RefObject<HTMLDivElement>, onContentChange: (text: string) => void) => {
    const removeDelimiters = (text: string, position: number, prefix: string, suffix: string = prefix) => {
        let startIndex = -1
        let endIndex = -1

        for (let i = Math.max(0, position - prefix.length - 100); i <= position - prefix.length; i++) {
            if (text.substring(i, i + prefix.length) === prefix) {
                startIndex = i
            }
        }

        if (startIndex !== -1) {
            for (let i = position; i <= Math.min(text.length - suffix.length, position + 100); i++) {
                if (text.substring(i, i + suffix.length) === suffix) {
                    endIndex = i
                    break
                }
            }
        }

        if (startIndex !== -1 && endIndex !== -1) {
            return {
                newText:
                    text.substring(0, startIndex) + text.substring(startIndex + prefix.length, endIndex) + text.substring(endIndex + suffix.length),
                newPosition: startIndex,
            }
        }

        return null
    }

    const wrapSelection = (prefix: string, suffix: string = prefix, isActive: boolean = false) => {
        const editor = editorRef.current
        if (!editor) return

        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return

        const range = selection.getRangeAt(0)
        const selectedText = range.toString()
        const currentText = editor.innerText
        const cursorPosition = getCursorPosition(editor)

        if (!selectedText && isActive) {
            const result = removeDelimiters(currentText, cursorPosition, prefix, suffix)
            if (result) {
                editor.innerText = result.newText

                const textNodes = []
                const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT, null)
                let node: Node | null
                while ((node = walker.nextNode())) {
                    textNodes.push(node as Text)
                }

                if (textNodes.length > 0) {
                    let currentPos = 0
                    for (const textNode of textNodes) {
                        const nodeLength = textNode.textContent?.length || 0
                        if (currentPos + nodeLength >= result.newPosition) {
                            const newRange = document.createRange()
                            const offset = result.newPosition - currentPos
                            newRange.setStart(textNode, offset)
                            newRange.setEnd(textNode, offset)
                            selection.removeAllRanges()
                            selection.addRange(newRange)
                            break
                        }
                        currentPos += nodeLength
                    }
                }

                onContentChange(result.newText)
            }
            return
        }

        if (!selectedText) return

        const isWrapped = selectedText.startsWith(prefix) && selectedText.endsWith(suffix)

        let newText: string
        if (isWrapped) {
            newText = selectedText.substring(prefix.length, selectedText.length - suffix.length)
        } else {
            newText = prefix + selectedText + suffix
        }

        range.deleteContents()
        const textNode = document.createTextNode(newText)
        range.insertNode(textNode)

        const newRange = document.createRange()
        if (isWrapped) {
            newRange.selectNodeContents(textNode)
        } else {
            newRange.setStart(textNode, prefix.length)
            newRange.setEnd(textNode, textNode.textContent!.length - suffix.length)
        }
        selection.removeAllRanges()
        selection.addRange(newRange)

        onContentChange(editor.innerText)
    }

    return { wrapSelection }
}
