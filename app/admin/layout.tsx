import { getServerSession } from '@lib/auth/session'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const AdminLayout: FC<PropsWithChildren> = async ({ children }) => {
    const session = await getServerSession()

    if (!session?.user || session.user.role !== 'admin') return notFound()

    return <>{children}</>
}

export default AdminLayout
