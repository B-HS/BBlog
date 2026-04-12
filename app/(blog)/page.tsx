import { getPostList } from '@entities/post'
import { LinkGroup } from '@features/common/link-group'
import { INFORMATION_LINKS, TOOL_LINKS } from '@lib/constants'
import { PostList } from '@widgets/post/post-list'
import { FC } from 'react'

const Home: FC = async () => {
    const [notices, posts] = await Promise.all([getPostList({ limit: 3, offset: 0, isNotice: true }), getPostList({ limit: 6, offset: 0 })])

    return (
        <div className='px-2 lg:px-0 flex flex-col gap-7 py-7'>
            <LinkGroup title='Informations' links={INFORMATION_LINKS} />
            <LinkGroup title='Tools' links={TOOL_LINKS} />
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
