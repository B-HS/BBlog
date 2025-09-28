'use client'

import { useEffect } from 'react'
import { setScrollToc } from 'scrollbar-toc'

export const FloatingMenu = () => {
    useEffect(() => {
        const article = document.querySelector('article.markdown-prose') as HTMLElement
        if (article) {
            setScrollToc(article, {
                scrollOffset: -60,
                rightOffset: 10,
                exceptLevel: [1],
            })
        }
    }, [])

    return <div className='peer fixed right-0 top-0 h-[100dvh] w-[5dvw] z-10 hidden lg:block' />
}
