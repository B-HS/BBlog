'use client'

import { cn } from '@shared/utils'
import { useEffect, useState } from 'react'

interface Heading {
    id: string
    text: string
    level: number
    children: Heading[]
}

export const FloatingMenu = () => {
    const [headings, setHeadings] = useState<Heading[]>([])
    const [activeId, setActiveId] = useState<string>('')

    useEffect(() => {
        const headingElements = Array.from(document.querySelectorAll('h2, h3, h4, h5'))
        const headingData: Heading[] = []
        let lastHeadingByLevel: { [level: number]: Heading } = {}

        headingElements.forEach((heading) => {
            const level = parseInt(heading.tagName[1], 10)
            const id = heading.id || heading.textContent?.replace(/\s+/g, '-').toLowerCase() || ''
            const text = heading.textContent || ''

            const newHeading: Heading = { id, text, level, children: [] }

            if (level === 2) {
                headingData.push(newHeading)
                lastHeadingByLevel = { 2: newHeading }
            } else {
                const parentLevel = level - 1
                const parentHeading = lastHeadingByLevel[parentLevel]
                if (parentHeading) {
                    parentHeading.children.push(newHeading)
                }
                lastHeadingByLevel[level] = newHeading
            }
        })

        setHeadings(headingData)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + window.innerHeight / 4

            const sortedHeadings = headings
                .flatMap((heading) => [heading, ...getNestedHeadings(heading.children)])
                .sort((a, b) => document.getElementById(a.id)?.offsetTop! - document.getElementById(b.id)?.offsetTop!)

            for (const heading of sortedHeadings) {
                const element = document.getElementById(heading.id)
                if (element && element.offsetTop <= scrollPosition) {
                    setActiveId(heading.id)
                }
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [headings])

    const getNestedHeadings = (children: Heading[]): Heading[] => {
        return children.flatMap((child) => [child, ...getNestedHeadings(child.children)])
    }

    const renderTOCItems = (items: Heading[]) => (
        <ul className='pl-4 border-l border-gray-300'>
            {items.map((heading) => (
                <li key={heading.id} className='mt-2 line-clamp-1'>
                    <a
                        href={`#${heading.id}`}
                        className={cn(
                            'text-sm transition-colors duration-200',
                            activeId === heading.id ? 'text-primary font-extrabold' : 'text-primary/50 hover:text-primary',
                        )}>
                        {heading.text}
                    </a>
                    {heading.children.length > 0 && renderTOCItems(heading.children)}
                </li>
            ))}
        </ul>
    )

    return (
        <nav className='fixed top-14 right-0 w-56  overflow-y-auto max-h-[80vh] bg-background rounded-sm hidden 2xl:block'>
            {renderTOCItems(headings)}
        </nav>
    )
}
