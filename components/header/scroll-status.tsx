'use client'
import { useEffect, useState } from 'react'

const ScrollStatus = () => {
    const [scrollPercentage, setScrollPercentage] = useState(0)

    const handleScroll = () => {
        const windowHeight = window.innerHeight
        const documentHeight = document.body.clientHeight
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
        <section className='w-full relative'>
            <section className='h-0.5 bg-neutral-700 dark:bg-neutral-300 absolute top-0 z-[52]' style={{ width: `${scrollPercentage}%` }} />
        </section>
    )
}

export default ScrollStatus
