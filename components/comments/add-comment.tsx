import { User } from '@supabase/supabase-js'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { addComment } from './crud-comment-fn'

const AddCommentInput = ({ username, user, avatarUrl, post }: { username: string; user: User | null; avatarUrl: string; post: string }) => {
    return username ? (
        <section className='flex w-full items-center justify-start gap-3'>
            <Avatar className='w-12 h-12'>
                <AvatarImage className='m-0 bg-background/15' src={avatarUrl} alt='Avatar' />
                <AvatarFallback>{user?.user_metadata?.name || user?.email}</AvatarFallback>
            </Avatar>
            <form className='flex-1 flex gap-1' action={addComment}>
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

export default AddCommentInput
