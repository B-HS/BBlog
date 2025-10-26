import { getPostList } from '@entities/post'
import { PostCard } from './post-card'
import { FC, ReactNode } from 'react'

interface PostListProps {
    posts: Awaited<ReturnType<typeof getPostList>>['data']
    children?: ReactNode
}

export const PostList: FC<PostListProps> = ({ posts, children }) => {
    return (
        <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
            {posts.map((post) => (
                <PostCard key={post.postId} post={post} />
            ))}
            {children}
        </section>
    )
}
