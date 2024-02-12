import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs))
}

export const markdownToText = (markdown: string): string => {
    let text: string = markdown
        .split('---')[2]
        .replace(/(^#+\s*)|(\n#+\s*)/g, '')
        .replace(/(\*{1,2}|_{1,2})(.*?)\1/g, '$2')
        .replace(/`{1,3}([\s\S]*?)`{1,3}/g, '')
        .replace(/!\[.*?\]\((.*?)\)|\[.*?\]\((.*?)\)/g, '$1$2')
        .replace(/^\s*[\-\+\*]\s*/gm, '')
        .replace(/^\s*>/gm, '')
        .replace(/^\s*[-*_]\s*$/gm, '')
        .replace(/\s+/g, ' ')
        .trim()
    return text
}

export const getStartEndDate = () => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const startOfDay = today.toISOString()

    today.setHours(23, 59, 59, 999)
    const endOfDay = today.toISOString()

    return { startOfDay, endOfDay }
}
