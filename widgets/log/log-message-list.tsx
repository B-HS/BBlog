'use client'

import { useInfiniteGetLogMessagesByUserId } from '@entities/log.client'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Image } from '@ui/image'
import dayjs from 'dayjs'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ImageModal } from './image-modal'
import { Loader2Icon } from 'lucide-react'

export const LogMessageList = ({ userId }: { userId: string }) => {
    const observerRef = useRef<HTMLDivElement>(null)
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteGetLogMessagesByUserId(userId)
    const messages = data?.pages.map((page) => page.content).flat() || []
    const [modalState, setModalState] = useState<{ open: boolean; images: { id: string; url: string }[]; initialIndex: number }>({
        open: false,
        images: [],
        initialIndex: 0,
    })

    useEffect(() => {
        if (observerRef.current) {
            const observer = new IntersectionObserver((entries) => {
                entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && fetchNextPage()
            })
            observer.observe(observerRef.current)
            return () => observer.disconnect()
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <>
            <section className='flex flex-col gap-5'>
                {messages.map((message, index) => (
                    <Fragment key={message.id}>
                        <article className='flex flex-col gap-2'>
                            <div className='flex gap-2 items-center'>
                                <Avatar className='size-10'>
                                    <AvatarImage src={message.user.image || '/favicon.ico'} alt={message.user.name} />
                                    <AvatarFallback>{message.user.name}</AvatarFallback>
                                </Avatar>
                                <div className='flex flex-col'>
                                    <span className='text-sm font-medium'>{message.user.name}</span>
                                    <span className='text-sm text-muted-foreground'>
                                        {dayjs(message.createdAt).format('YYYY. MM. DD HH:mm:ss A')}
                                    </span>
                                </div>
                            </div>
                            <section className='p-2 flex gap-2 bg-muted w-fit'>
                                {message.images.map((image, imageIndex) => (
                                    <Image
                                        priority
                                        key={image.id}
                                        src={image.url}
                                        alt={image.id}
                                        width={200}
                                        height={200}
                                        className='cursor-pointer hover:opacity-90 transition-opacity object-contain'
                                        onClick={() => {
                                            setModalState({
                                                open: true,
                                                images: message.images,
                                                initialIndex: imageIndex,
                                            })
                                        }}
                                    />
                                ))}
                            </section>
                            <p>{message.body}</p>
                        </article>
                        {index !== messages.length - 1 && <div className='h-px w-full bg-border' />}
                    </Fragment>
                ))}
                <div className='h-10 flex items-center justify-center' ref={observerRef}>
                    {(isFetchingNextPage || isPending) && (
                        <div className='flex items-center justify-center h-full'>
                            <Loader2Icon className='size-10 animate-spin' />
                        </div>
                    )}
                </div>
            </section>
            <ImageModal
                images={modalState.images}
                initialIndex={modalState.initialIndex}
                open={modalState.open}
                onOpenChange={(open) => setModalState((prev) => ({ ...prev, open }))}
            />
        </>
    )
}
