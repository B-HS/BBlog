'use client'

import { misskeyQueries } from '@entities/misskey'
import { MisskeyPostImageCarousel } from '@features/misskey'
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar'
import { Card, CardContent, CardHeader } from '@shared/ui/card'
import { Separator } from '@shared/ui/separator'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useRef } from 'react'

export const MisskeyPostList = ({ userId }: { userId: string }) => {
    const observerRef = useRef<HTMLDivElement>(null)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(misskeyQueries.userNotes(userId))

    useEffect(() => {
        if (observerRef.current) {
            const observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting && (!hasNextPage || isFetchingNextPage) && fetchNextPage()
            })
            observer.observe(observerRef.current)
        }
    }, [])

    return (
        <Fragment>
            {data?.pages.map((page, pageIdx) => (
                <section key={pageIdx} className='divide-y-2'>
                    {page?.map((post) => {
                        const { user } = post
                        return (
                            <Fragment key={post.id}>
                                <Card className='border-none py-0 shadow-none'>
                                    <CardHeader className='py-3'>
                                        <section className='flex flex-1 gap-2 items-center'>
                                            <Avatar className='size-10'>
                                                <AvatarImage src={user.avatarUrl} alt={user.name} />
                                                <AvatarFallback>{user.name}</AvatarFallback>
                                            </Avatar>
                                            <section className='w-full flex flex-col'>
                                                <span className='font-bold'>@{user.username}</span>
                                                <span className='text-xs text-foreground/35'>{new Date(post.createdAt).toLocaleString()}</span>
                                            </section>
                                        </section>
                                    </CardHeader>
                                    <CardContent className='pb-3 px-7'>
                                        <section className='flex items-center justify-center'>
                                            {post.files.length > 0 && post.files.filter((file) => file.type.includes('image')).length > 0 && (
                                                <MisskeyPostImageCarousel images={post.files} />
                                            )}
                                        </section>
                                        <p>{post.text}</p>
                                    </CardContent>
                                </Card>
                                <Separator />
                            </Fragment>
                        )
                    })}
                </section>
            ))}

            <div className='h-10' ref={observerRef}>
                {isFetchingNextPage && 'Loading more...'}
            </div>
        </Fragment>
    )
}
