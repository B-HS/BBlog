import { Toaster } from '@shared/ui/toaster'
import { cn } from '@shared/utils'
import { SiteHeader } from '@widgets/header'
import { QueryProvider, SessionProvider, ThemeProvider } from '@widgets/provider'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import { FC, ReactNode } from 'react'
import './globals.css'

const GoToTop = dynamic(() => import('@features/common').then((comp) => comp.GoToTop), { ssr: false })

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
            alt: 'Post thumbnail',
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

const fontRound = M_PLUS_Rounded_1c({
    subsets: ['latin'],
    variable: '--font-mplus',
    weight: ['100', '300', '500', '700', '800', '900'],
})

const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className={cn('flex flex-col min-h-dvh font-mplus antialiased max-w-screen-lg mx-auto', fontRound.variable)}>
                <SessionProvider>
                    <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                        <QueryProvider>
                            <SiteHeader />
                            <section className='mx-auto overflow-auto size-full flex-1'>
                                {children}
                                <GoToTop />
                            </section>
                            <Toaster />
                        </QueryProvider>
                    </ThemeProvider>
                </SessionProvider>
            </body>
        </html>
    )
}

export default RootLayout
