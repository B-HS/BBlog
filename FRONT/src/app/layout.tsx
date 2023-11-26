import Flex from '@/components/flex'
import Header from '@/components/header/header'
import Sidebar from '@/components/sidebar/sidebar'
import ThemeProvider from '@/components/themeProvider'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import './globals.css'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className={cn('min-h-screen bg-background font-mplusrounded antialiased flex flex-col')}>
                <ThemeProvider attribute='class'>
                    <Header className='border-b' />
                    <Flex className='justify-start p-0 h-full flex-1'>
                        <Sidebar className='min-h-full pt-14 shadow-xl' />
                        <Flex className='p-0 pt-14 flex-col transition-all md:ml-[285px] w-full shadow-xl'>
                            <section className='p-5'>{children}</section>
                            <Flex className='flex-col items-center justify-center border-t h-10'>Copyright © 2023. BLOGOWNER</Flex>
                        </Flex>
                    </Flex>
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
