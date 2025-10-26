'use client'

import { Github } from '@ui/icons/github'
import { authClient } from '@lib/auth/auth-client'
import { Button } from '@ui/button'
import { Home } from 'lucide-react'
import { useRouter } from 'next/navigation'

const LoginPage = () => {
    const router = useRouter()
    const { signIn } = authClient
    return (
        <main className='flex flex-col items-center justify-center h-screen gap-5'>
            <h1 className='text-2xl font-bold'>Login</h1>
            <Button className='min-w-50 cursor-pointer' variant='outline' size='lg' onClick={() => signIn.social({ provider: 'github' })}>
                <Github className='dark:invert' />
                <span>Login with GitHub</span>
            </Button>
            <Button className='min-w-50 cursor-pointer' variant='default' size='lg' onClick={() => router.push('/')}>
                <Home />
                <span>Back to Home</span>
            </Button>
        </main>
    )
}

export default LoginPage
