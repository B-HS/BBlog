import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { Separator } from '../ui/separator'
import AddCommentInput from './add-comment'
import CommentsList from './comment-list'

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
    children?: CommentProps[]
    depth?: number
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
        <section
            id='comment-section'
            className='prose prose-neutral dark:prose-invert container max-w-screen-lg py-7 bg-neutral-50 dark:bg-neutral-900 rounded my-5'>
            <section className='space-x-1'>
                <span className='text-xl'>Comments</span>
                <span className='text-foreground/50'>({comments.length})</span>
            </section>
            <AddCommentInput username={username} user={user} avatarUrl={avatarUrl} post={post} />
            <Separator className='my-3 h-2' />
            <CommentsList comments={comments} user={user} post={post} />
            <Separator className='my-3 h-2' />
        </section>
    )
}

export default Comments
