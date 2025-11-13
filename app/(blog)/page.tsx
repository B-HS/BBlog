import { getPostList } from '@entities/post'
import { QUERY_KEY } from '@lib/constants'
import { buttonVariants } from '@ui/button'
import { Github } from '@ui/icons/github'
import { PostList } from '@widgets/post/post-list'
import { ScrollTextIcon } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import Link from 'next/link'
import { FC } from 'react'

const Home: FC = async () => {
    const cachedMainListData = unstable_cache(
        async () => await Promise.all([getPostList({ limit: 3, offset: 0, isNotice: true }), getPostList({ limit: 6, offset: 0 })]),
        [QUERY_KEY.POST.MAIN],
        {
            revalidate: 60 * 60 * 24 * 30,
            tags: [QUERY_KEY.POST.MAIN],
        },
    )()

    const [notices, posts] = await cachedMainListData

    return (
        <div className='px-2 lg:px-0 flex flex-col gap-7 py-7'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>Informations</h2>
                <div className='flex gap-2'>
                    <Link
                        href='https://github.com/B-HS'
                        className={buttonVariants({ variant: 'outline', size: 'icon-lg', className: '[&>svg]:size-5.5!' })}>
                        <Github className='dark:invert' />
                    </Link>
                    <Link
                        href='https://resume.gumyo.net'
                        className={buttonVariants({ variant: 'outline', size: 'icon-lg', className: '[&>svg]:size-5.5!' })}>
                        <ScrollTextIcon />
                    </Link>
                </div>
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>Notice</h2>
                <PostList posts={notices.data} />
            </div>
            <div className='flex flex-col gap-2'>
                <h2 className='text-2xl font-bold'>Recent Articles</h2>
                <PostList posts={posts.data} />
            </div>
        </div>
    )
}

export default Home
