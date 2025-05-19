'use client'

import { CommentProps } from '@entities/comment'
import { AddCommentInput, CommentsList } from '@features/mdx/comments'
import { useQuery } from '@tanstack/react-query'

export const Comments = ({ post }: { post: number }) => {
    const { data: commentList } = useQuery({
        queryKey: ['comments', post],
        queryFn: async () => {
            const data = await fetch(`/api/comment/${post}`)
            if (data.status !== 200) return []
            const commentData = (await data.json()) as { comments: CommentProps[] }
            return commentData.comments
        },
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
    })

    return (
        <section id='comment-section' className='prose prose-neutral dark:prose-invert max-w-(--breakpoint-lg) px-3 py-5 rounded space-y-3'>
            <section className='space-x-1'>
                <span className='text-xl'>Comments</span>
                <span className='text-foreground/50'>({commentList?.length})</span>
            </section>
            <AddCommentInput post={post} />
            <CommentsList comments={commentList || []} />
        </section>
    )
}
