import { auth } from '@lib/auth/auth'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const AdminLayout: FC<PropsWithChildren> = async ({ children }) => {
    const session = await auth.api.getSession({
        headers: await Promise.resolve(new Headers()),
    })

    if (!session?.user || session.user.role !== 'admin') {
        notFound()
    }

    return <>{children}</>
}

export default AdminLayout
