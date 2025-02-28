'use client'

import { Button } from '@shared/ui/button'
import { cx } from 'class-variance-authority'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'

export const GoToTop = () => {
    const [isTop, setIsTop] = useState(true)

    useEffect(() => {
        window.onscroll = () => setIsTop(window.scrollY === 0)
        return () => {
            window.onscroll = null
        }
    })

    return (
        !isTop && (
            <Button
                variant={'secondary'}
                size={'icon'}
                className={cx('fixed bottom-9 right-9 transition-all z-50 size-9 border border-primary/10', !isTop && 'opacity-100')}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <ArrowUp />
            </Button>
        )
    )
}
