import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { addComment } from './comment-fn'

export interface CommentProps {
    id: number
    upper_id: number
    context: string
    user_id: string
    username: string
    avatar: string
    post: string
    created_at: Date
    updated_at: Date
    deleted: boolean
}

const Comments = async ({ comments, post }: { comments: CommentProps[]; post: string }) => {
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')
    const currentURL = `${origin}://${domain}`
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { user } = (await supabase.auth.getUser()).data
    const username = user?.user_metadata?.name || user?.email || undefined
    const avatarUrl = user?.user_metadata?.avatar_url || currentURL + '/image/hs-padding.png'

    return (
        <section className='prose prose-neutral dark:prose-invert container max-w-screen-lg py-7 bg-neutral-50 dark:bg-neutral-900 rounded my-5'>
            <section className='space-x-1'>
                <span className='text-xl'>Comments</span>
                <span className='text-foreground/30'>({comments.length})</span>
            </section>
            {username ? (
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
                <p className='text-foreground/30'>Please login to comment</p>
            )}
            <section className='flex flex-col'>
                {comments.map((ele, idx) => (
                    <span key={idx}>
                        {/* 사용자 이름 */}
                        <p>{ele.username}</p>
                        {/* 댓글 내용 */}
                        <p>{ele.context}</p>
                        {/* 내가 쓴 덧글인지 확인하는 로직 */}
                        <p>{ele.user_id === user?.id ? 'me' : 'not me'}</p>
                        {/* 아바타 주소 */}
                        <p>{ele.avatar}</p>
                    </span>
                ))}
            </section>
        </section>
    )
}

export default Comments
