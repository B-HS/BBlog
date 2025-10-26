export const handleLineBreak = (mode: 'br' | 'newline' = 'br'): boolean => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return false

    const range = selection.getRangeAt(0)

    range.deleteContents()

    if (mode === 'br') {
        const br = document.createElement('br')
        range.insertNode(br)

        if (!br.nextSibling) {
            const extraBr = document.createElement('br')
            if (br.parentNode) {
                br.parentNode.insertBefore(extraBr, br.nextSibling)
            }
        }

        range.setStartAfter(br)
        range.collapse(true)
    } else {
        const lineBreak = document.createTextNode('\n')
        range.insertNode(lineBreak)

        range.setStartAfter(lineBreak)
        range.collapse(true)
    }

    selection.removeAllRanges()
    selection.addRange(range)

    return true
}
