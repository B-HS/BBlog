import { CommentProps } from '@entities/comment'
import { AddCommentInput, CommentsList } from '@features/mdx/comments'

export const Comments = async ({ comments, post }: { comments: CommentProps[]; post: number }) => {
    return (
        <section id='comment-section' className='prose prose-neutral dark:prose-invert max-w-(--breakpoint-lg) px-3 py-5 rounded space-y-3'>
            <section className='space-x-1'>
                <span className='text-xl'>Comments</span>
                <span className='text-foreground/50'>({comments.length})</span>
            </section>
            <AddCommentInput post={post} />
            <CommentsList comments={comments} />
        </section>
    )
}
