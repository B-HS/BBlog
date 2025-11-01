'use client'

import { useSession } from '@entities/auth.client'
import { authClient } from '@lib/auth/auth-client'
import { Button, buttonVariants } from '@ui/button'
import { User } from 'better-auth'
import { LogOut, Pencil } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { Fragment } from 'react/jsx-runtime'

export const AuthenticatedNavs: FC = () => {
    const { data: session } = useSession()
    const user = session?.user as (User & { role: string }) | undefined
    const signOut = () => authClient.signOut()

    return (
        user?.role === 'admin' && (
            <Fragment>
                <Button variant='ghost' size='icon' onClick={signOut} aria-label='로그아웃'>
                    <LogOut />
                </Button>
                <Link href='/write' className={buttonVariants({ variant: 'ghost', size: 'icon' })} aria-label='글쓰기'>
                    <Pencil />
                </Link>
            </Fragment>
        )
    )
}
