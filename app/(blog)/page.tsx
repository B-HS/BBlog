import { getPostList } from '@entities/post'
import { UserCard } from '@features/common/user-card'
import { PostList } from '@widgets/post/post-list'
import { FC } from 'react'

const Home: FC = async () => {
    const [notices, posts] = await Promise.all([getPostList({ limit: 3, offset: 0, isNotice: true }), getPostList({ limit: 6, offset: 0 })])

    return (
        <div className='px-2 lg:px-0 flex flex-col gap-7 py-7'>
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
