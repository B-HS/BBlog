import { auth, signOut } from '@shared/auth'
import { Button } from '@shared/ui/button'
import { LogInIcon, LogOutIcon } from 'lucide-react'
import Link from 'next/link'

export const SignInOut = async () => {
    const session = await auth()
    return (
        <>
            {session?.user?.email ? (
                <form
                    className='w-9 h-9'
                    action={async () => {
                        'use server'
                        await signOut({ redirectTo: '/', redirect: true })
                    }}>
                    <Button variant='ghost' size={'icon'} aria-label='Log out'>
                        <LogOutIcon className='p-0.5' />
                    </Button>
                </form>
            ) : (
                <Button variant='ghost' size={'icon'} aria-label='Log out' asChild>
                    <Link className='p-0' href={'/login'}>
                        <LogInIcon />
                    </Link>
                </Button>
            )}
        </>
    )
}
