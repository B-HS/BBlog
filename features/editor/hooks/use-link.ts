import { type RefObject } from 'react'

export const useLink = (editorRef: RefObject<HTMLDivElement>, onContentChange: (text: string) => void) => {
    const handleLink = () => {
        const editor = editorRef.current
        if (!editor) return

        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) return

        const range = selection.getRangeAt(0)
        const selectedText = range.toString()

        const trimmedText = selectedText.trim()
        const leadingSpaces = selectedText.match(/^(\s*)/)?.[1] || ''
        const trailingSpaces = selectedText.match(/(\s*)$/)?.[1] || ''

        const linkText = trimmedText || 'link text'
        const linkMarkdown = leadingSpaces + `[${linkText}](url)` + trailingSpaces

        range.deleteContents()
        const textNode = document.createTextNode(linkMarkdown)
        range.insertNode(textNode)

        const newRange = document.createRange()
        if (trimmedText) {
            newRange.setStart(textNode, leadingSpaces.length + linkText.length + 3)
            newRange.setEnd(textNode, leadingSpaces.length + linkText.length + 6)
        } else {
            newRange.setStart(textNode, leadingSpaces.length + 1)
            newRange.setEnd(textNode, leadingSpaces.length + 1 + linkText.length)
        }

        selection.removeAllRanges()
        selection.addRange(newRange)

        onContentChange(editor.innerText)
    }

    return { handleLink }
}
