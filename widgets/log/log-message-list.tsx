'use client'

import { useInfiniteGetMessagesByUserId, useDeleteMessage } from '@entities/message.client'
import { useSession } from '@entities/auth.client'
import { LOG_USER_ID } from '@lib/constants'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Button } from '@ui/button'
import { Image } from '@ui/image'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@ui/alert-dialog'
import { User } from 'better-auth'
import dayjs from 'dayjs'
import { Loader2Icon, Trash2 } from 'lucide-react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { ImageModal } from './image-modal'
import UserProfileImage from '@lib/images/seyanaprofile.png'

export const LogMessageList = () => {
    const observerRef = useRef<HTMLDivElement>(null)
    const { data: session } = useSession()
    const user = session?.user as (User & { role?: string }) | undefined
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } = useInfiniteGetMessagesByUserId(LOG_USER_ID)
    const { mutate: deleteMessage } = useDeleteMessage(LOG_USER_ID)
    const messages = data?.pages.map((page) => page.content).flat() || []
    const [modalState, setModalState] = useState<{ open: boolean; images: { id: string; url: string }[]; initialIndex: number }>({
        open: false,
        images: [],
        initialIndex: 0,
    })
    const [deleteDialogState, setDeleteDialogState] = useState<{ open: boolean; messageId: string | null }>({
        open: false,
        messageId: null,
    })

    const handleDeleteClick = (messageId: string) => {
        setDeleteDialogState({ open: true, messageId })
    }

    const handleDeleteConfirm = () => {
        if (deleteDialogState.messageId) {
            deleteMessage(deleteDialogState.messageId)
            setDeleteDialogState({ open: false, messageId: null })
        }
    }

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
                            <div className='flex gap-2 items-center justify-between'>
                                <div className='flex gap-2 items-center'>
                                    <Avatar className='size-10'>
                                        <AvatarImage src={UserProfileImage.src} alt={message.user.name} />
                                        <AvatarFallback>{message.user.name}</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-medium'>{message.user.name}</span>
                                        <span className='text-sm text-muted-foreground'>
                                            {dayjs(message.createdAt).format('YYYY. MM. DD HH:mm:ss A')}
                                        </span>
                                    </div>
                                </div>
                                {user?.role === 'admin' && (
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='size-8'
                                        onClick={() => handleDeleteClick(message.id)}
                                        aria-label='메시지 삭제'>
                                        <Trash2 className='size-4' />
                                    </Button>
                                )}
                            </div>
                            {message.images.length > 0 && (
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
                            )}
                            <p className=''>{message.body}</p>
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
            <AlertDialog open={deleteDialogState.open} onOpenChange={(open) => setDeleteDialogState((prev) => ({ ...prev, open }))}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>메시지 삭제</AlertDialogTitle>
                        <AlertDialogDescription>정말로 이 메시지를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>취소</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirm}>삭제</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
}
