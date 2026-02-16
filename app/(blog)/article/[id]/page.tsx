import { getPost } from '@entities/post'
import { UserCard } from '@features/common/user-card'
import { toHTMLWithTOC } from '@features/editor/markdown'
import { CommentSection } from '@widgets/comment/comment-section'
import { ScrollbarToc } from '@widgets/layout/scrollbar-toc'
import { PostHeader } from '@widgets/post/post-header'
import { PostTagList } from '@widgets/post/post-tag-list'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'

export const revalidate = 2592000

export const generateMetadata = async (props: { params: Promise<{ id: string }> }): Promise<Metadata> => {
    const params = await props.params
    const [post] = await getPost(params.id)

    if (!post) notFound()

    const thumbnails = `${process.env.NEXT_PUBLIC_API_URL}/api/blog/posts/${params.id}/thumbnail`
    const tags = post.tags.map((t) => t.tag)
    const context = post.description.slice(0, 250).replace(/<\/?[^>]+(>|$)/g, '')

    return {
        title: post.title,
        description: context || `Article | ${process.env.SITE_NAME}`,
        keywords: tags.join(', ') || `Article | ${process.env.SITE_NAME}`,
        robots: {
            index: true,
            follow: true,
            nocache: false,
        },
        authors: [{ name: process.env.AUTHOR || 'Author Name', url: process.env.SITE_URL || 'https://gumyo.net' }],
        openGraph: {
            title: post.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            siteName: process.env.SITE_NAME || '',
            images: [
                {
                    url: thumbnails,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            images: {
                url: thumbnails,
                alt: 'Post thumbnail',
            },
            title: post.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            creator: process.env.AUTHOR || process.env.SITE_NAME || '',
            creatorId: params.id,
        },
        publisher: process.env.AUTHOR || process.env.SITE_NAME || '',
        category: post.categoryName || 'etc.',
        creator: process.env.AUTHOR || process.env.SITE_NAME || '',
        generator: process.env.AUTHOR || process.env.SITE_NAME || '',
    }
}

const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const [post] = await getPost(id)

    if (!post) notFound()

    const { content } = await toHTMLWithTOC(post.description)
    return (
        <Fragment>
            <article>
                <PostHeader title={post.title} category={post.categoryName ?? 'etc.'} createdAt={post.createdAt} />
                <div className='prose p-3.5 text-primary flex-shrink-0'>{content}</div>
                <section className='p-3.5'>
                    <PostTagList tags={post.tags ?? []} />
                </section>
                <hr className='border-border' />
                <UserCard />
                <CommentSection postId={post.postId} />
            </article>
            <ScrollbarToc />
        </Fragment>
    )
}

export default ArticleDetailPage
