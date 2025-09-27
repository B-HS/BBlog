'use client'

import { commentQueries } from '@entities/comment'
import { AddCommentInput, CommentsList } from '@features/mdx/comments'
import { useQuery } from '@tanstack/react-query'

export const Comments = ({ post }: { post: number }) => {
    const { data: commentList } = useQuery(commentQueries.byPost(post))

    return (
        <section id='comment-section' className='prose prose-neutral dark:prose-invert max-w-(--breakpoint-lg) px-3 py-5 rounded space-y-3'>
            <header className='space-x-1'>
                <h2 className='text-xl inline'>Comments</h2>
                <span className='text-foreground/50'>({commentList?.length})</span>
            </header>
            <AddCommentInput post={post} />
            <CommentsList comments={commentList || []} />
        </section>
    )
}
