import { LayoutHeader } from '@widgets/layout/header'
import type { Metadata } from 'next'
import { FC, Fragment, PropsWithChildren } from 'react'

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

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <LayoutHeader className='max-w-screen-lg mx-auto' />
            <main className='antialiased relative max-w-screen-lg mx-auto pb-10'>{children}</main>
        </Fragment>
    )
}

export default Layout
