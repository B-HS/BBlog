import { ScrollbarToc } from '@widgets/layout/scrollbar-toc'
import { Post } from './_contents/post-content'
import { Fragment, Suspense } from 'react'
import { Metadata } from 'next'
import { getPost } from '@entities/post'
import { notFound } from 'next/navigation'
import { toPlainText } from '@features/editor/markdown'

export const generateMetadata = async (props: { params: Promise<{ id: string }> }): Promise<Metadata> => {
    const params = await props.params
    const [post] = await getPost(params.id)

    if (!post) notFound()

    const thumbnails = [`${process.env.SITE_URL}/thumbnail/${params.id}`]
    const tags = post.tags.map((t) => t.tag)
    const context = await toPlainText(post.description)
    const defaultDescription = `${post.title} - ${process.env.SITE_NAME || 'Blog'} 아티클`

    return {
        title: post.title,
        description: context || defaultDescription,
        keywords: tags.join(', ') || `Article | ${process.env.SITE_NAME}`,
        robots: {
            index: true,
            follow: true,
            nocache: false,
        },
        authors: [{ name: process.env.AUTHOR || 'Author Name', url: process.env.SITE_URL || 'https://gumyo.net' }],
        openGraph: {
            title: post.title,
            description: context || defaultDescription,
            siteName: process.env.SITE_NAME || '',
            images: [
                {
                    url: thumbnails[0],
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            images: {
                url: thumbnails[0],
                alt: 'Post thumbnail',
            },
            title: post.title,
            description: context || defaultDescription,
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
    return (
        <Fragment>
            <Suspense>
                <Post params={params} />
            </Suspense>
            <ScrollbarToc />
        </Fragment>
    )
}

export default ArticleDetailPage
