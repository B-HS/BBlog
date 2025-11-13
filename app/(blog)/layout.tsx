import { LayoutHeader } from '@widgets/layout/header'
import { FC, Fragment, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Fragment>
            <LayoutHeader className='max-w-5xl mx-auto' />
            <main className='antialiased relative max-w-5xl mx-auto pb-10'>{children}</main>
        </Fragment>
    )
}

export default Layout
