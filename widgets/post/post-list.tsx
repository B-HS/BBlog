'use client'

import { useCategoriesQuery } from '@/entities/category/category.query'
import { GetPostsRequest } from '@/entities/post'
import { useGetPosts } from '@/entities/post/post.queries'
import { Pagination, SearchInput } from '@/features/common'
import { PostCard } from '@/features/post'
import { Badge } from '@/shared/ui'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'

interface PostListProps {
    params?: GetPostsRequest
    headingLevel?: 'h2' | 'h3'
}

export const PostList: FC<PostListProps> = ({ params, headingLevel = 'h2' }) => {
    const router = useRouter()
    const { data: posts, isLoading } = useGetPosts(params)
    const { data: categories } = useCategoriesQuery()

    const onClick = (page: number) => router.replace(`/post?page=${page}`)
    const onSearch = (keywords: string) => router.replace(`/post?search=${keywords}`)
    const handleSearch = (key: string, value?: string) => {
        const searchParams = new URLSearchParams(params as Record<string, string>)
        if (value) searchParams.set(key, value)
        else searchParams.delete(key)
        router.replace(`/post?${searchParams.toString()}`)
    }

    return (
        <Fragment>
            <section className='flex gap-2 overflow-scroll w-full'>
                <Badge
                    onClick={() => handleSearch('categoryId')}
                    className='rounded-sm cursor-pointer'
                    variant={!params?.categoryId ? 'default' : 'outline'}>
                    All
                </Badge>
                {categories?.results?.map((category) => (
                    <Badge
                        onClick={() => handleSearch('categoryId', category.id)}
                        className='rounded-sm cursor-pointer'
                        key={category.categoryId}
                        variant={params?.categoryId === category.id ? 'default' : 'outline'}>
                        {category.name}
                    </Badge>
                ))}
            </section>
            <SearchInput onSearch={onSearch} />
            <ul aria-labelledby='notice-heading' className='grid gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                {isLoading
                    ? Array.from({ length: 9 }).map((_, index) => (
                          <li key={index}>
                              <div className='w-[326.66px] h-[105.5px] bg-gray-200 rounded-sm animate-pulse' />
                          </li>
                      ))
                    : posts?.results.map((post) => (
                          <li key={post.postId}>
                              <PostCard post={post} headingLevel={headingLevel} />
                          </li>
                      ))}
            </ul>
            <Pagination className='py-10' page={posts?.page || 1} totalPages={posts?.total ? Math.ceil(posts.total / 9) : 1} onClick={onClick} />
        </Fragment>
    )
}
