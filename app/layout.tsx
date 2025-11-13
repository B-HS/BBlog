import { VirtualScroll } from '@features/theme/virtual-scroll'
import { TanstackQueryProvider } from '@lib/providers/tanstack-query-provider'
import { ThemeProvider } from '@lib/providers/theme-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from '@ui/sonner'
import { GoToTop } from '@widgets/layout/go-to-top'
import { Metadata } from 'next'
import { FC, PropsWithChildren } from 'react'
import './globals.css'

export const metadata: Metadata = {
    metadataBase: new URL(process.env.SITE_URL || 'https://blog.gumyo.net'),
    title: {
        default: process.env.SITE_NAME || 'Hyunseok Blog',
        template: `%s | ${process.env.SITE_NAME || 'Hyunseok Blog'}`,
    },
    description: 'Frontend Engineer Blog - Next.js, React, TypeScript',
    openGraph: {
        type: 'website',
        locale: 'ko_KR',
        siteName: process.env.SITE_NAME || 'Hyunseok Blog',
    },
    robots: {
        index: true,
        follow: true,
    },
}

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang='ko' data-scroll-behavior='smooth' suppressHydrationWarning>
            <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_ID || ''} />
            <body className='antialiased relative'>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <TanstackQueryProvider>{children}</TanstackQueryProvider>
                </ThemeProvider>
                <VirtualScroll />
                <Toaster />
                <GoToTop />
            </body>
        </html>
    )
}

export default Layout
