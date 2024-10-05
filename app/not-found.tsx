import { Button } from '@shared/ui/button'
import { ArrowUpLeftFromSquareIcon, BirdIcon } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
    return (
        <section className='w-full text-center space-y-2 p-5'>
            <BirdIcon className='animate-bounce mx-auto' />
            <p className='text-5xl font-bold'>Not Found</p>
            <p>Could not find requested page</p>
            <Button asChild>
                <Link href='/' className='space-x-2'>
                    <ArrowUpLeftFromSquareIcon />
                    <span>Back to Home</span>
                </Link>
            </Button>
        </section>
    )
}
