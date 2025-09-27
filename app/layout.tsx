import { Toaster } from '@shared/ui/toaster'
import { SiteHeader } from '@widgets/header'
import { QueryProvider, SessionProvider } from '@widgets/provider'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import dynamic from 'next/dynamic'
import { FC, ReactNode } from 'react'
import './globals.css'

const GoToTop = dynamic(() => import('@features/common').then((comp) => comp.GoToTop))

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

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className='flex flex-col min-h-dvh antialiased size-full items-center'>
                <section className='max-w-(--breakpoint-lg) w-full'>
                    <SessionProvider>
                        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                            <QueryProvider>
                                <SiteHeader />
                                <main className='flex-1 overflow-auto size-full'>
                                    {children}
                                    <GoToTop />
                                </main>
                                <Toaster />
                            </QueryProvider>
                        </ThemeProvider>
                    </SessionProvider>
                </section>
            </body>
        </html>
    )
}

export default RootLayout
