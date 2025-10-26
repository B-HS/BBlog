'use client'

import { authClient } from '@lib/auth/auth-client'
import { Button, buttonVariants } from '@ui/button'
import { User } from 'better-auth'
import { LogOut, Pencil } from 'lucide-react'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'

export const AuthenticatedNavs: FC = () => {
    const [user, setUser] = useState<User & { role: string }>()
    const signOut = () => authClient.signOut()

    useEffect(() => {
        authClient.getSession().then((session) => {
            const user = session.data?.user as User & { role: string }
            setUser(user)
        })
    }, [])
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
