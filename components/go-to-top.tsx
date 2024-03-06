'use client'

import { cx } from 'class-variance-authority'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'

const GoToTop = () => {
    const [isTop, setIsTop] = useState(true)

    useEffect(() => {
        window.onscroll = () => setIsTop(window.scrollY === 0)
        return () => {
            window.onscroll = null
        }
    })

    return (
        <Button
            variant={'secondary'}
            size={'icon'}
            className={cx(
                'fixed bottom-3 right-10 text-foreground/50 hover:text-foreground/100 transition-all z-50',
                isTop ? 'opacity-0' : 'opacity-100',
                'h-12 w-12',
            )}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
            <ArrowUp />
        </Button>
    )
}

export default GoToTop
