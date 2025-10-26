'use client'

import { Button } from '@ui/button'
import { ClipboardCopy } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { toast } from 'sonner'

interface CodeBlockProps {
    language: string
    code: ReactNode
}

const copyToClipboard = (text: string) => navigator.clipboard.writeText(text)

const extractTextFromReactNode = (node: ReactNode): string => {
    const html = renderToStaticMarkup(<>{node}</>)
    const div = document.createElement('div')
    div.innerHTML = html
    return div.textContent || ''
}

export const CodeBlock: FC<CodeBlockProps> = ({ language, code }) => {
    const handleCopy = () => {
        const text = extractTextFromReactNode(code)
        copyToClipboard(text)
        toast.success('Copied to clipboard', {
            duration: 2000,
        })
    }

    return (
        <pre className='rounded bg-neutral-800 border border-neutral-600 my-1.75 text-neutral-100'>
            <nav className='flex justify-between items-center gap-2 p-1.75 border-b border-neutral-600 select-none'>
                <p className='font-medium text-sm'>{language.replaceAll('HLJS', '')}</p>
                <Button variant='ghost' size='icon' onClick={handleCopy}>
                    <ClipboardCopy />
                </Button>
            </nav>
            <div className='p-2.75'>
                <code className='text-2xs lg:text-sm whitespace-pre-wrap break-all bg-transparent [&>*]:tracking-tighter'>{code}</code>
            </div>
        </pre>
    )
}
