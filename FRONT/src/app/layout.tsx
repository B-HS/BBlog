import Flex from '@/components/flex'
import Header from '@/components/header/header'
import Loading from '@/components/loading'
import Sidebar from '@/components/sidebar/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import ModuleProvider from '@/module/moduleProvider'
import { ReactNode } from 'react'
import './globals.css'

const RootLayout = ({ children }: { children: ReactNode }) => {
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className={cn('min-h-screen bg-primary-foreground font-mplusrounded antialiased flex flex-col')}>
                <ModuleProvider>
                    <Header />
                    <Flex className='justify-start p-0 h-full flex-1'>
                        <Sidebar className='min-h-full pt-[3.75rem]' />
                        <Flex className='p-0 pt-[3.75rem] flex-col transition-all md:ml-[285px] w-full'>
                            <section className='p-5  bg-background'>{children}</section>
                            <Flex className='flex-col items-center justify-center border-t h-10'>Copyright © 2023. BLOGOWNER</Flex>
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
