import { AddCommentInput, CommentsList } from '@features/mdx/comments'
import { useQuery } from '@tanstack/react-query'
import { db } from 'drizzle'
import { desc, eq } from 'drizzle-orm'
import { comments } from 'drizzle/schema'

export const Comments = ({ post }: { post: number }) => {
    const { data: commentList } = useQuery({
        queryKey: ['comments', post],
        queryFn: async () => await db.select().from(comments).where(eq(comments.postId, post)).orderBy(desc(comments.createdAt)),
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
