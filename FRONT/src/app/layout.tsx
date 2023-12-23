import Flex from '@/components/flex'
import Footer from '@/components/footer/footer'
import Header from '@/components/header/header'
import Loading from '@/components/loading'
import Sidebar from '@/components/sidebar/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import ModuleProvider from '@/module/moduleProvider'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import { ReactNode } from 'react'
import './globals.css'

const mplus = M_PLUS_Rounded_1c({
    weight: ['500', '800'],
    subsets: ['latin'],
    display: 'swap',
})

export const metadata = {
    metadataBase: new URL('https://img.gumyo.net'),
    title: 'BBlog',
    description: 'BBlog',
    openGraph: {
        title: 'BBlog',
        description: 'BBlog',
        url: 'https://gumyo.net',
        siteName: 'BBlog',
    },
    twitter: {
        title: 'BBlog',
        description: 'BBlog',
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/favicon.ico',
    },
}

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className={cn('min-h-screen bg-primary-foreground font-mplusrounded antialiased flex flex-col relative') + ' ' + mplus.className}>
                <ModuleProvider>
                    <Header />
                    <Flex className='justify-start p-0 h-full flex-1'>
                        <Sidebar className='min-h-full pt-[3.75rem]' />
                        <Flex className='p-0 pt-[3.75rem] flex-col transition-all md:ml-[285px] w-full'>
                            <Flex className='flex-col p-5 w-full h-full bg-background'>{children}</Flex>
                            <Footer />
                        </Flex>
                    </Flex>
                    <Toaster />
                    <Loading />
                </ModuleProvider>
            </body>
        </html>
    )
}

export default RootLayout
