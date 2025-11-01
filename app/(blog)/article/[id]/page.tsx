import { ScrollbarToc } from '@widgets/layout/scrollbar-toc'
import { Post } from './_contents/post-content'
import { Fragment, Suspense } from 'react'
import { Metadata } from 'next'
import { getPost } from '@entities/post'
import { notFound, redirect } from 'next/navigation'

export const generateMetadata = async (props: { params: Promise<{ id: string }> }): Promise<Metadata> => {
    const params = await props.params
    const [post] = await getPost(params.id)

    if (!post) notFound()

    const thumbnails = [`${process.env.SITE_URL}/favicon.ico`]
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
