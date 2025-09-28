'use client'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export const VirtualScroll = () => {
    const path = usePathname()
    const [scrollData, setScrollData] = useState({ thumbHeight: 0, thumbTop: 0, isScrollable: false })

    const handleScroll = () => {
        requestAnimationFrame(() => {
            const windowHeight = window.innerHeight
            const documentHeight = document.documentElement.scrollHeight
            const scrollableHeight = documentHeight - windowHeight
            const currentScrollPosition = window.scrollY

            const thumbHeight = (windowHeight / documentHeight) * 100
            const scrollPercentage = scrollableHeight > 0 ? (currentScrollPosition / scrollableHeight) * 100 : 0
            const thumbTop = (scrollPercentage * (100 - thumbHeight)) / 100

            setScrollData({
                thumbHeight: Math.max(thumbHeight, 10),
                thumbTop: Math.min(thumbTop, 100 - thumbHeight),
                isScrollable: thumbHeight < 100,
            })
        })
    }

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleScroll)
        }
    }, [])

    useEffect(() => {
        handleScroll()
    }, [path])

    return (
        scrollData.isScrollable && (
            <section className='fixed right-0 top-0 h-full w-1.5'>
                <section
                    className='absolute right-0 z-52 w-1.5 rounded-xs bg-foreground/30 will-change-transform'
                    style={{
                        height: `${scrollData.thumbHeight}%`,
                        top: `${scrollData.thumbTop}%`,
                    }}
                />
            </section>
        )
    )
}
