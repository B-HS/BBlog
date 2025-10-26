import { VirtualScroll } from '@features/theme/virtual-scroll'
import { TanstackQueryProvider } from '@lib/providers/tanstack-query-provider'
import { ThemeProvider } from '@lib/providers/theme-provider'
import { Toaster } from '@ui/sonner'
import { FC, PropsWithChildren } from 'react'
import './globals.css'
import { GoToTop } from '@widgets/layout/go-to-top'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <html lang='ko' data-scroll-behavior='smooth' suppressHydrationWarning>
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
