import { createClient } from '@/utils/supabase/server'
import { User } from '@supabase/supabase-js'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Button, buttonVariants } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { CommentProps } from './comments'
import { addComment } from './crud-comment-fn'

const EditComment = ({ comment, user, post }: { comment: CommentProps; user: User | null; post: string }) => {
    const removeComment = async (formData: FormData) => {
        'use server'
        const headersList = headers()
        const domain = headersList.get('x-forwarded-host')
        const origin = headersList.get('x-forwarded-proto')
        const currentURL = `${origin}://${domain}`
        const id = formData.get('id') as string
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data, error } = await supabase.from('comments').update({ deleted: true }).eq('id', id).eq('user_id', user?.id).select()
        if (error) {
            console.log(error)
        }
        const targetId = data![0].id || undefined
        return redirect(currentURL + `/article/${post}?deleted=${targetId}#${targetId}`)
    }

    const updateComment = async (formData: FormData) => {
        'use server'
        const headersList = headers()
        const domain = headersList.get('x-forwarded-host')
        const origin = headersList.get('x-forwarded-proto')
        const currentURL = `${origin}://${domain}`
        const id = formData.get('id') as string
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { data, error } = await supabase
            .from('comments')
            .update({ context: formData.get('context'), updated_at: new Date() })
            .eq('id', id)
            .eq('user_id', user?.id)
            .select()
        if (error) {
            console.log(error)
        }
        const targetId = data![0].id || undefined
        return redirect(currentURL + `/article/${post}?modified=${targetId}#${targetId}`)
    }

    return (
        <>
            {user?.id && (
                <Popover>
                    <PopoverTrigger className={buttonVariants({ variant: 'link', size: 'sm', className: 'px-0.5' })}>Reply</PopoverTrigger>
                    <PopoverContent>
                        <section className='space-y-2 flex flex-col items-center'>
                            <form className='grid w-full items-center gap-1.5' action={addComment}>
                                <Label htmlFor='context'>Reply</Label>
                                <Input type='text' id='context' name='context' className='bg-foreground/25' placeholder='Reply to comment' />
                                <input type='hidden' value={comment.id} name='id' id='id' />
                                <input type='hidden' value={post} name='post' id='post' />
                                <Button variant={'default'} size={'sm'} className='w-full' type='submit'>
                                    Submit
                                </Button>
                            </form>

                            <Button variant={'secondary'} size={'sm'} className='w-full'>
                                Cancel
                            </Button>
                        </section>
                    </PopoverContent>
                </Popover>
            )}
            {user?.id === comment.user_id && (
                <Popover>
                    <PopoverTrigger className={buttonVariants({ variant: 'link', size: 'sm', className: 'px-0.5' })}>Edit</PopoverTrigger>
                    <PopoverContent>
                        <section className='space-y-2 flex flex-col items-center'>
                            <form className='grid w-full items-center gap-1.5' action={updateComment}>
                                <Label htmlFor='context'>Context</Label>
                                <Input
                                    type='text'
                                    id='context'
                                    name='context'
                                    className='bg-foreground/25'
                                    placeholder='Edit your comment'
                                    defaultValue={comment.context}
                                />
                                <input type='hidden' value={comment.id} name='id' id='id' />
                                <Button variant={'default'} size={'sm'} className='w-full' type='submit'>
                                    Submit
                                </Button>
                            </form>

                            <Button variant={'secondary'} size={'sm'} className='w-full'>
                                Cancel
                            </Button>
                        </section>
                    </PopoverContent>
                </Popover>
            )}
            {user?.id === comment.user_id && (
                <Popover>
                    <PopoverTrigger className={buttonVariants({ variant: 'link', size: 'sm', className: 'px-0.5' })}>Delete</PopoverTrigger>
                    <PopoverContent>
                        <section className='space-y-2 flex flex-col items-center'>
                            <p className='font-bold text-lg'>Delete this comment?</p>
                            <form action={removeComment} className='w-full'>
                                <input type='hidden' value={comment.id} name='id' id='id' />
                                <Button variant={'destructive'} size={'sm'} className='w-full' type='submit'>
                                    Yes
                                </Button>
                            </form>
                            <Button variant={'secondary'} size={'sm'} className='w-full'>
                                No
                            </Button>
                        </section>
                    </PopoverContent>
                </Popover>
            )}
        </>
    )
}

export default EditComment
