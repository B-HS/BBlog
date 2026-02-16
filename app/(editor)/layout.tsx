import { getServerSession } from '@lib/auth/session'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const EditorLayout: FC<PropsWithChildren> = async ({ children }) => {
    const session = await getServerSession()

    session?.user.role !== 'admin' && notFound()

    return children
}

export default EditorLayout
