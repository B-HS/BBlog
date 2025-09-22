'use client'

import { FC } from 'react'
import { PostCard } from '@/features/post'
import { GetPostsRequest } from '@/entities/post'
import { useGetPosts } from '@/entities/post/post.queries'

interface MainListProps {
    params?: GetPostsRequest
    headingLevel?: 'h2' | 'h3'
}

export const MainList: FC<MainListProps> = ({ params, headingLevel = 'h3' }) => {
    const { data: posts, isLoading } = useGetPosts(params)

    if (isLoading) {
        return (
            <>
                {Array.from({ length: 3 }).map((_, index) => (
                    <li key={index}>
                        <div className='w-full h-[105.5px] bg-gray-200 rounded-sm animate-pulse' />
                    </li>
                ))}
            </>
        )
    }

    return (
        <>
            {posts?.results?.map((post) => (
                <li key={post.postId}>
                    <PostCard post={post} headingLevel={headingLevel} />
                </li>
            ))}
        </>
    )
}
