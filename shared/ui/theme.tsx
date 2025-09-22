'use client'

import { buttonVariants } from '@shared/ui/button'
import { LoaderIcon, MoonStar, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { cn } from '../utils'

export const Theme = () => {
    const { setTheme, resolvedTheme } = useTheme()
    const [isTop, setIsTop] = useState(true)

    useEffect(() => {
        setIsTop(window.scrollY === 0)
        window.addEventListener('scroll', () => {
            setIsTop(window.scrollY === 0)
        })

        return () => {
            window.removeEventListener('scroll', () => {})
        }
    }, [window.scrollY])

    return (
        <div className={cn('fixed bottom-10 right-10 border rounded transition-all duration-150 opacity-100', isTop && 'opacity-0')}>
            {resolvedTheme !== undefined && resolvedTheme === 'dark' ? (
                <MoonStar
                    className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })}
                    onClick={() => setTheme('light')}
                />
            ) : (
                <SunDim
                    className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })}
                    onClick={() => setTheme('dark')}
                />
            )}
        </div>
    )
}

export const ThemeChanger = dynamic(() => Promise.resolve(Theme), {
    ssr: false,
    loading: () => (
        <div className={cn('fixed bottom-10 right-10 border rounded transition-all duration-150 opacity-100')}>
            <LoaderIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer animate-spin' })} />
        </div>
    ),
})
