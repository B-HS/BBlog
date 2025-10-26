export interface MarkdownStyles {
    isBold: boolean
    isItalic: boolean
    isUnderline: boolean
    isStrikethrough: boolean
    isCode: boolean
    isLink: boolean
}

export const detectMarkdownStyle = (text: string, position: number): MarkdownStyles => {
    if (!text || position < 0 || position > text.length) {
        return {
            isBold: false,
            isItalic: false,
            isUnderline: false,
            isStrikethrough: false,
            isCode: false,
            isLink: false,
        }
    }

    const checkPattern = (start: string, end: string = start): boolean => {
        let startIndex = -1
        for (let i = position - 1; i >= Math.max(0, position - 100); i--) {
            if (text.substring(i, i + start.length) === start) {
                startIndex = i
                break
            }
        }

        if (startIndex === -1) return false

        for (let i = position; i <= Math.min(text.length - end.length, position + 100); i++) {
            if (text.substring(i, i + end.length) === end) {
                return true
            }
        }

        return false
    }

    let isBold = false
    let isItalic = false

    for (let i = position - 1; i >= Math.max(0, position - 100); i--) {
        if (text.substring(i, i + 3) === '***') {
            for (let j = position; j <= Math.min(text.length - 3, position + 100); j++) {
                if (text.substring(j, j + 3) === '***') {
                    isBold = true
                    isItalic = true
                    break
                }
            }
            if (isBold && isItalic) break
        }
    }

    if (!isBold && !isItalic) {
        for (let i = position - 1; i >= Math.max(0, position - 100); i--) {
            if (text.substring(i, i + 2) === '**' && text[i - 1] !== '*' && text[i + 2] !== '*') {
                for (let j = position; j <= Math.min(text.length - 2, position + 100); j++) {
                    if (text.substring(j, j + 2) === '**' && text[j - 1] !== '*' && text[j + 2] !== '*') {
                        isBold = true
                        break
                    }
                }
                break
            }
        }

        for (let i = position - 1; i >= Math.max(0, position - 100); i--) {
            if (text[i] === '*' && text[i - 1] !== '*' && text[i + 1] !== '*') {
                for (let j = position; j < Math.min(text.length, position + 100); j++) {
                    if (text[j] === '*' && text[j - 1] !== '*' && text[j + 1] !== '*') {
                        isItalic = true
                        break
                    }
                }
                break
            }
        }
    }
    const isUnderline = checkPattern('<u>', '</u>')
    const isStrikethrough = checkPattern('~~')
    const isCode = checkPattern('`') || checkPattern('```')

    let isLink = false
    for (let i = Math.max(0, position - 100); i <= position; i++) {
        if (text[i] === '[') {
            const endBracket = text.indexOf(']', i + 1)
            if (endBracket !== -1 && text[endBracket + 1] === '(') {
                const endParen = text.indexOf(')', endBracket + 2)
                if (endParen !== -1 && position >= i && position <= endParen) {
                    isLink = true
                    break
                }
            }
        }
    }

    return {
        isBold,
        isItalic,
        isUnderline,
        isStrikethrough,
        isCode,
        isLink,
    }
}
