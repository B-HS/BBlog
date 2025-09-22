import { Header } from '@/features/common'
import { QueryProvider } from '@/shared/provider'
import { ThemeChanger } from '@/shared/ui'
import { ThemeProvider } from 'next-themes'
import { FC, ReactNode } from 'react'
import './globals.css'
import { Metadata } from 'next'

interface RootLayoutProps {
    children: ReactNode
}

export const metadata: Metadata = {
    metadataBase: new URL('https://blog.guymyo.net'),
    title: process.env.SITE_NAME,
    authors: [{ name: 'Hyunseok Byun', url: 'https://github.com/B-HS' }],
    description: `Hyunseok Byun - ${process.env.SITE_NAME}`,
    openGraph: {
        title: process.env.SITE_NAME,
        description: process.env.SITE_NAME,
        url: 'https://blog.guymyo.net',
        siteName: process.env.SITE_NAME,
        images: [
            {
                url: 'https://img.gumyo.net/hs-padding.png',
                width: 1200,
                height: 630,
            },
        ],
    },
    twitter: {
        images: {
            url: 'https://img.gumyo.net/hs-padding.png',
            alt: process.env.SITE_NAME,
        },
        title: process.env.SITE_NAME,
        description: process.env.SITE_NAME,
        creator: 'Hyunseok Byun',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/favicon.ico',
    },
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className='antialiased bg-background text-foreground relative max-w-5xl mx-auto min-h-dvh flex flex-col gap-px py-2 h-[200dvh]'>
                <a href='#main-content' className='sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50'>
                    Skip to main content
                </a>
                <QueryProvider>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        <Header />
                        <hr className='my-1.5' />
                        {children}
                        <ThemeChanger />
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    )
}

export default RootLayout
