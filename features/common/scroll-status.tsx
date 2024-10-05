'use client'
import { useEffect, useState } from 'react'

export const ScrollStatus = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0)

    const handleScroll = () => {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollableHeight = documentHeight - windowHeight
        const currentScrollPosition = window.scrollY
        const calculatedScrollPercentage = (currentScrollPosition / scrollableHeight) * 100
        setScrollPercentage(calculatedScrollPercentage >= 100 ? 100 : calculatedScrollPercentage)
    }

    useEffect(() => {
        handleScroll()
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <section className='relative w-dvw'>
            <section
                className='top-0 z-[52] absolute bg-neutral-700 dark:bg-neutral-300 h-0.5 transition-all duration-75 ease-out'
                style={{ width: `${scrollPercentage}%` }}
            />
        </section>
    )
}
