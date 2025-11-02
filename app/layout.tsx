import { VirtualScroll } from '@features/theme/virtual-scroll'
import { TanstackQueryProvider } from '@lib/providers/tanstack-query-provider'
import { ThemeProvider } from '@lib/providers/theme-provider'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Toaster } from '@ui/sonner'
import { GoToTop } from '@widgets/layout/go-to-top'
import { FC, PropsWithChildren } from 'react'
import './globals.css'

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
