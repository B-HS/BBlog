import { auth } from '@lib/auth/auth'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { FC, PropsWithChildren } from 'react'

const EditorLayout: FC<PropsWithChildren> = async ({ children }) => {
    const session = await auth.api.getSession({ headers: await headers() })

    session?.user.role !== 'admin' && notFound()

    return children
}

export default EditorLayout
