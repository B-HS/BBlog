'use client'

import { ThemeProvider as NextThemesProvider, ThemeProviderProps } from 'next-themes'
import dynamic from 'next/dynamic'

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}

export const DynamicThemeProvider = dynamic(() => Promise.resolve(ThemeProvider), {
    loading: () => <div className='aspect-video blur-md bg-foreground/10 border' />,
})
