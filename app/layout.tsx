import SiteHeader from '@/components/header/header'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/toaster'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/server'
import 'dayjs/locale/ko'
import { Metadata } from 'next'
import { M_PLUS_Rounded_1c } from 'next/font/google'
import { cookies } from 'next/headers'
import SiteFooter from '../components/footer/footer'
import './globals.css'

const font = M_PLUS_Rounded_1c({
    subsets: ['latin'],
    weight: ['100', '300', '500', '700'],
    variable: '--font-mplus-rounded-1c',
})

export const metadata: Metadata = {
    metadataBase: new URL('https://blog.guymyo.net'),
    title: {
        default: '- HS',
        template: '%s | HS ',
    },
    authors: [{ name: 'Hyunseok Byun', url: 'https://github.com/B-HS' }],
    description: 'Hyunseok Byun - BBlog',
    openGraph: {
        title: 'BBlog',
        description: 'BBlog',
        url: 'https://blog.guymyo.net',
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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
    const cookieStore = cookies()
    const canInitSupabaseClient = () => {
        try {
            createClient(cookieStore)
            return true
        } catch (e) {
            return false
        }
    }
    const isSupabaseConnected = canInitSupabaseClient()
    return (
        <html lang='ko' suppressHydrationWarning>
            <body className={cn('container max-w-screen-lg font-mplus-rounded-1c antialiased', font.variable)}>
                <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                    <SiteHeader />
                    <section className='w-full h-full'>{isSupabaseConnected ? children : <span>500 Error</span>}</section>
                    <SiteFooter />
                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    )
}

export default RootLayout
