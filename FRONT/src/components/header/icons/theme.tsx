'use client'
import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

const Theme = () => {
    const { theme, setTheme } = useTheme()
    return (
        <Button size={'icon'} variant='ghost' onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </Button>
    )
}

export default Theme
