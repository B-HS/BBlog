'use client'

import { Button } from '@shared/ui/button'
import { ArrowUpLeftFromSquareIcon, BirdIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'

const GlobalError = () => {
    const router = useRouter()
    return (
        <section className='w-full text-center space-y-2 p-5 font-mono'>
            <BirdIcon className='animate-bounce mx-auto size-16' />
            <p className='text-5xl font-bold'>Error</p>
            <p>Something went wrong ...</p>
            <section className='flex gap-2 items-center justify-center'>
                <Button className='space-x-2' onClick={() => router.push('/')}>
                    <ArrowUpLeftFromSquareIcon />
                    <span>Back to Home</span>
                </Button>
            </section>
        </section>
    )
}

export default GlobalError
