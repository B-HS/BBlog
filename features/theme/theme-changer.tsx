'use client'

import { Button } from '@ui/button'
import { Loader2, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'

export const ThemeChangerComponent = () => {
    const { setTheme, resolvedTheme } = useTheme()
    const Icon = resolvedTheme === 'dark' ? Moon : Sun

    return (
        <Button
            variant='ghost'
            size='icon'
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            aria-label={`테마 변경 (현재: ${resolvedTheme === 'dark' ? '다크모드' : '라이트모드'})`}>
            <Icon />
        </Button>
    )
}

export const ThemeChanger = dynamic(() => Promise.resolve(ThemeChangerComponent), {
    ssr: false,
    loading: () => (
        <Button variant='ghost' size='icon' aria-label='테마 로딩 중'>
            <Loader2 className='animate-spin size-5' />
        </Button>
    ),
})
