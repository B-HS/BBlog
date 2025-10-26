import { Button } from '@ui/button'
import { ArrowUpLeftFromSquareIcon, BirdIcon } from 'lucide-react'
import Link from 'next/link'

const NotFound = () => {
    return (
        <section className='w-full text-center space-y-2 p-5'>
            <BirdIcon className='animate-bounce mx-auto size-16' aria-hidden='true' />
            <p className='text-5xl font-bold'>Not Found</p>
            <p>Could not find requested page</p>
            <Button asChild>
                <Link href='/' className='space-x-2'>
                    <ArrowUpLeftFromSquareIcon aria-hidden='true' />
                    <span>Back to Home</span>
                </Link>
            </Button>
        </section>
    )
}

export default NotFound
