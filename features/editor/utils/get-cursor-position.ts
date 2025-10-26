export const getCursorPosition = (editorElement: HTMLDivElement): number => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) {
        return -1
    }

    const range = selection.getRangeAt(0)
    let position = 0

    const walker = document.createTreeWalker(editorElement, NodeFilter.SHOW_TEXT, null)

    let node: Node | null
    while ((node = walker.nextNode())) {
        if (node === range.startContainer) {
            position += range.startOffset
            break
        }
        position += node.textContent?.length || 0
    }

    return position
}
