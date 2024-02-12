import Link from 'next/link'
import Navigation from './navigation'
import ScrollStatus from './scroll-status'
import { getFileInfo } from '@/lib/files'

const SiteHeader = async () => {
    const posts = await getFileInfo(true)
    return (
        <header className='sticky top-0 z-50 w-full border-b backdrop-blur'>
            <section className='flex h-14 justify-between items-center px-3'>
                <Link href={'/'} className='flex gap-2 items-center text-xl font-bold'>
                    Hyunseok
                </Link>
                <Navigation list={posts} />
            </section>
            <ScrollStatus />
        </header>
    )
}

export default SiteHeader
