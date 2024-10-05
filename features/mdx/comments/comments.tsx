import { CommentProps } from '@entities/comment'
import { CommentsList, AddCommentInput } from '@features/mdx/comments'
import { Separator } from '@shared/ui/separator'

export const Comments = async ({ comments, post }: { comments: CommentProps[]; post: string }) => {
    return (
        <section
            id='comment-section'
            className='prose prose-neutral dark:prose-invert container max-w-screen-lg py-7 bg-neutral-50 dark:bg-neutral-900 rounded my-5'>
            <section className='space-x-1'>
                <span className='text-xl'>Comments</span>
                <span className='text-foreground/50'>({comments.length})</span>
            </section>
            <AddCommentInput username={'USER'} user={{}} avatarUrl={'/favicon.ico'} post={post} />
            <Separator className='my-3 h-2' />
            <CommentsList comments={comments} user={{}} post={post} />
            <Separator className='my-3 h-2' />
        </section>
    )
}
