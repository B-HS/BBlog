'use client'

import dynamic from 'next/dynamic'
import { FC, useEffect } from 'react'
import { setScrollToc } from 'scrollbar-toc'

export const ScrollbarTocComponent: FC = () => {
    useEffect(() => {
        const article = document.querySelector('article') as HTMLElement
        if (!article) return

        const cleanup = setScrollToc(article, {
            scrollOffset: -60,
            rightOffset: 10,
            exceptLevel: [1],
            className: 'cursor-pointer',
        })

        return cleanup
    }, [])

    return <aside className='peer fixed right-0 top-0 h-dvh w-[5dvw] z-10 hidden lg:block' role='complementary' aria-label='목차' />
}

export const ScrollbarToc = dynamic(() => Promise.resolve(ScrollbarTocComponent), { ssr: false })
