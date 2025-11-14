import { auth } from '@lib/auth/auth'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const AdminLayout: FC<PropsWithChildren> = async ({ children }) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    if (!session?.user || session.user.role !== 'admin') return notFound()

    return <>{children}</>
}

export default AdminLayout
