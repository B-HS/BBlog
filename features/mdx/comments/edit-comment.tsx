import { CommentProps } from '@entities/comment'
import { PopClose } from '@features/mdx/comments'
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar'
import { Button, buttonVariants } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Label } from '@shared/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@shared/ui/popover'

const addComment = async (formData: FormData) => {
    'use server'
    // LOGIC FOR ADDING COMMENT
}
const removeComment = async (formData: FormData) => {
    'use server'
    //LOGIC FOR DELETING COMMENT
}
const updateComment = async (formData: FormData) => {
    'use server'
    //LOGIC FOR UPDATING COMMENT
}

export const AddCommentInput = ({
    username,
    user,
    avatarUrl,
    post,
}: {
    username: string
    user: Record<string, any> | null
    avatarUrl: string
    post: string
}) => {
    return username ? (
        <section className='flex w-full items-center justify-start gap-3'>
            <Avatar className='w-12 h-12'>
                <AvatarImage className='m-0 bg-background/15' src={avatarUrl} alt='Avatar' />
                <AvatarFallback>{user?.user_metadata?.name || user?.email}</AvatarFallback>
            </Avatar>
            <form className='flex-1 flex gap-1' action={addComment}>
                <label htmlFor='context' className='sr-only'>
                    Comment:
                </label>
                <Input type='text' id='context' name='context' />
                <input type='hidden' id='post' name='post' value={post} />
                <Button variant='secondary' type='submit'>
                    Submit
                </Button>
            </form>
        </section>
    ) : (
        <p className='text-foreground/30 animate-pulse'>- Please login to comment or reply</p>
    )
}

export const EditComment = ({ comment, user, post }: { comment: CommentProps; user: Record<string, any> | null; post: string }) => {
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
                                <input type='hidden' value={comment.commentId} name='id' id='id' />
                                <input type='hidden' value={post} name='post' id='post' />
                                <Button variant={'default'} size={'sm'} className='w-full' type='submit'>
                                    Submit
                                </Button>
                            </form>
                            <PopClose>
                                <Button variant={'secondary'} size={'sm'} className='w-full'>
                                    Cancel
                                </Button>
                            </PopClose>
                        </section>
                    </PopoverContent>
                </Popover>
            )}

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
                                defaultValue={comment.comment}
                            />
                            <input type='hidden' value={comment.commentId} name='id' id='id' />
                            <Button variant={'default'} size={'sm'} className='w-full' type='submit'>
                                Submit
                            </Button>
                        </form>
                        <PopClose>
                            <Button variant={'secondary'} size={'sm'} className='w-full'>
                                Cancel
                            </Button>
                        </PopClose>
                    </section>
                </PopoverContent>
            </Popover>

            <Popover>
                <PopoverTrigger className={buttonVariants({ variant: 'link', size: 'sm', className: 'px-0.5' })}>Delete</PopoverTrigger>
                <PopoverContent>
                    <section className='space-y-2 flex flex-col items-center'>
                        <p className='font-bold text-lg'>Delete this comment?</p>
                        <form action={removeComment} className='w-full'>
                            <input type='hidden' value={comment.commentId} name='id' id='id' />
                            <Button variant={'destructive'} size={'sm'} className='w-full' type='submit'>
                                Yes
                            </Button>
                        </form>
                        <PopClose>
                            <Button variant={'secondary'} size={'sm'} className='w-full'>
                                No
                            </Button>
                        </PopClose>
                    </section>
                </PopoverContent>
            </Popover>
        </>
    )
}
