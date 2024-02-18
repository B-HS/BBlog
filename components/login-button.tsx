import { Button } from '@/components/ui/button'
import { createClient } from '@/utils/supabase/server'
import { LogInIcon, LogOutIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import UserToast from './user-toast'

const LoginButton = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const {
        data: { user },
    } = await supabase.auth.getUser()

    const signOut = async () => {
        'use server'
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.signOut()
    }

    return (
        <>
            {user ? (
                <form action={signOut} className='w-9 h-9'>
                    <Button variant='ghost' size={'icon'}>
                        <LogOutIcon className='p-0.5' />
                    </Button>
                </form>
            ) : (
                <Button variant={'ghost'} size={'icon'} className='p-2' asChild>
                    <Link className='p-0' href={'/login'}>
                        <LogInIcon />
                    </Link>
                </Button>
            )}
            <UserToast user={user} />
        </>
    )
}

export default LoginButton
