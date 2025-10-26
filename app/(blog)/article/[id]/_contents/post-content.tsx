'use cache'

import { getPost } from '@entities/post'
import { toHTMLWithTOC } from '@features/editor/markdown'
import { QUERY_KEY } from '@lib/constants'
import { PostTagList } from '@widgets/post/post-tag-list'
import { cacheTag } from 'next/cache'
import { FC } from 'react'
import { PostHeader } from '@widgets/post/post-header'
import { notFound } from 'next/navigation'
import { UserCard } from '@features/common/user-card'
import { CommentSection } from '@widgets/comment/comment-section'
interface PostProps {
    params: Promise<{
        id: string
    }>
}

export const Post: FC<PostProps> = async ({ params }) => {
    const { id } = await params
    const [post] = await getPost(id)

    if (!post) notFound()

    const { content } = await toHTMLWithTOC(post.description)

    cacheTag(...QUERY_KEY.POST.GET(String(id)))

    return (
        <article>
            <PostHeader title={post.title} category={post.categoryName ?? 'etc.'} createdAt={post.createdAt} />
            <div className='prose p-3.5 text-primary'>{content}</div>
            <section className='p-3.5'>
                <PostTagList tags={post.tags ?? []} />
            </section>
            <hr className='border-border' />
            <UserCard />
            <CommentSection postId={post.postId} />
        </article>
    )
}
