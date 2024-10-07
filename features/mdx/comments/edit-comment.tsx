'use client'

import { DisplayingCommentType } from '@entities/comment'
import { PopClose } from '@features/mdx/comments'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, buttonVariants } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Label } from '@shared/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const commentSchema = z.object({
    username: z.string().min(1, 'Nickname is required'),
    password: z.string().min(1, 'Password is required'),
    commentText: z.string().min(1, 'Comment text is required'),
    post: z.number(),
})

type CommentFormValues = z.infer<typeof commentSchema>

const addComment = async (data: CommentFormValues) => {
    const { commentText, password, post, username } = data

    const response = await fetch(`/api/comment/${post}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ commentText, password, username }),
    })

    const result = await response.json()
    result.commentId && window.location.reload()
}

export const AddCommentInput = ({ post }: { post: number }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CommentFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: { post },
    })

    return (
        <section className='flex w-full items-center justify-start gap-3'>
            <form className='flex-1 flex gap-3 flex-col' onSubmit={handleSubmit(addComment)}>
                <section className='flex gap-2 items-center w-full'>
                    <section className='flex flex-col gap-1 w-full'>
                        <Label htmlFor='username'>Nickname</Label>
                        <Input {...register('username')} placeholder='Enter the nickname' />
                        {errors.username && <p className='text-red-600 my-1'>{errors.username.message}</p>}
                    </section>
                    <section className='flex flex-col gap-1 w-full'>
                        <Label htmlFor='password'>Password</Label>
                        <Input {...register('password')} type='password' placeholder='Enter the password' />
                        {errors.password && <p className='text-red-600 my-1'>{errors.password.message}</p>}
                    </section>
                </section>

                <section className='flex gap-2 flex-col'>
                    <Label htmlFor='commentText'>Comment Description</Label>
                    <Input {...register('commentText')} placeholder='Enter the comment description' />
                    {errors.commentText && <p className='text-red-600 my-1'>{errors.commentText.message}</p>}
                </section>

                <input type='hidden' {...register('post')} value={post} />

                <Button variant='secondary' type='submit'>
                    Submit
                </Button>
            </form>
        </section>
    )
}

export const EditComment = ({ comment }: { comment: DisplayingCommentType }) => {
    const updateCommentSchema = z.object({
        commentText: z.string().min(1, 'Comment text is required'),
        id: z.number(),
        post: z.number(),
        password: z.string().min(1, 'Password is required'),
    })

    const {
        setError,
        register,
        handleSubmit,
        getValues,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(updateCommentSchema),
        defaultValues: {
            password: '',
            commentText: comment.comment,
            id: comment.commentId,
            post: comment.postId,
        },
    })

    const updateComment = async (data: z.infer<typeof updateCommentSchema>) => {
        const { commentText, id, post, password } = data

        const response = await fetch(`/api/comment/${post}`, {
            method: 'PUT',
            body: JSON.stringify({ commentText, id, password }),
        })

        if (response.status === 200) {
            window.location.reload()
            return true
        } else {
            setError('password', { message: 'Check the password' })
        }
    }

    const removeComment = async () => {
        const id = getValues('id')
        const post = getValues('post')
        await fetch(`/api/comment/${post}`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        }).then((res) => {
            res.status === 200 ? window.location.reload() : setError('password', { message: 'Check the password' })
        })
    }

    return (
        <Fragment>
            <Popover>
                <PopoverTrigger className={buttonVariants({ variant: 'link', size: 'sm', className: 'px-0.5' })}>Edit</PopoverTrigger>
                <PopoverContent>
                    <span className='text-lg font-bold'>Edit Comment</span>
                    <section className='space-y-2 flex flex-col items-center'>
                        <form className='grid w-full items-center gap-2' onSubmit={handleSubmit(updateComment)}>
                            <section className='flex flex-col w-full gap-2'>
                                <Label htmlFor='commentText'>Edit your comment</Label>
                                <Input {...register('commentText')} className='border' />
                                {errors.commentText && <p className='text-red-600 my-1'>{errors.commentText.message}</p>}
                            </section>

                            <section className='flex flex-col w-full gap-2'>
                                <Label htmlFor='password'>Password</Label>
                                <Input {...register('password')} type='password' className='border' />
                                {errors.password && <p className='text-red-600 my-1'>{errors.password.message}</p>}
                            </section>

                            <input type='hidden' {...register('id')} />
                            <input type='hidden' {...register('post')} />

                            <Button variant={'default'} size={'sm'} className='w-full' type='submit'>
                                Submit
                            </Button>
                        </form>
                        <Button variant={'destructive'} size={'sm'} className='w-full' onClick={removeComment}>
                            Remove
                        </Button>
                        <PopClose>
                            <Button variant={'secondary'} size={'sm'} className='w-full'>
                                Cancel
                            </Button>
                        </PopClose>
                    </section>
                </PopoverContent>
            </Popover>
        </Fragment>
    )
}
