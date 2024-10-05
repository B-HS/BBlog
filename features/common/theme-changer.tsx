'use client'
import { buttonVariants } from '@shared/ui/button'
import { MoonStar, SunDim } from 'lucide-react'
import { useTheme } from 'next-themes'

export const ThemeChanger = () => {
    const { setTheme, theme } = useTheme()

    return (
        <>
            {theme === 'dark' ? (
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
        </>
    )
}
