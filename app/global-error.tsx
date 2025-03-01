'use client'

import { Button } from '@shared/ui/button'
import { ArrowUpLeftFromSquareIcon, BirdIcon } from 'lucide-react'

const GlobalError = () => {
    return (
        <section className='w-full text-center space-y-2 p-5 font-mono'>
            <BirdIcon className='animate-bounce mx-auto size-16' />
            <p className='text-5xl font-bold'>Error</p>
            <p>Something went wrong ...</p>
            <section className='flex gap-2 items-center justify-center'>
                <Button asChild>
                    <a href='/' className='space-x-2'>
                        <ArrowUpLeftFromSquareIcon />
                        <span>Back to Home</span>
                    </a>
                </Button>
            </section>
        </section>
    )
}

export default GlobalError
