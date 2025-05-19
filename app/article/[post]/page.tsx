import { ArticleDetail } from '@entities/article'
import { fetchPostData } from '@entities/article/article.webapi'
import { CustomMdx, MdxPage } from '@features/mdx'
import { Comments } from '@features/mdx/comments'
import { markdownToText } from '@shared/utils'
import { ImageFallbackSetter } from '@widgets/article/image'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { Fragment } from 'react'

export const generateMetadata = async (props: { params: Promise<{ post: string }> }): Promise<Metadata> => {
    const params = await props.params
    const fetchedData = await fetchPostData(params)
    const source = fetchedData as ArticleDetail
    source.post?.title || redirect('/404')

    const thumbnails = [`${process.env.SITE_URL}/favicon.ico`]

    const frontmatter = {
        title: source?.post?.title || '',
        tags: source?.tags.at(0)?.split(',') || [],
        date: source?.post?.createdAt.toString() || '',
        category: source?.category || '',
        thumbnail: thumbnails[0],
        viewCnt: String(source?.post?.views) || '',
    }
    const context = (markdownToText(source?.post.description.toString().slice(0, 250)) || frontmatter.title || '')?.replace(/<\/?[^>]+(>|$)/g, '')

    return {
        title: frontmatter.title,
        description: context || `Article | ${process.env.SITE_NAME}`,
        keywords: frontmatter.tags?.join(', ') || `Article | ${process.env.SITE_NAME}`,
        robots: {
            index: true,
            follow: true,
            nocache: false,
        },
        authors: [{ name: process.env.AUTHOR || 'Author Name', url: process.env.SITE_URL || 'https://gumyo.net' }],
        openGraph: {
            title: frontmatter.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            siteName: process.env.SITE_NAME || '',
            images: [
                {
                    url: `${frontmatter?.thumbnail}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            images: {
                url: `${frontmatter?.thumbnail}`,
                alt: 'Post thumbnail',
            },
            title: frontmatter.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            creator: process.env.AUTHOR || process.env.SITE_NAME || '',
            creatorId: params.post,
        },
        publisher: process.env.AUTHOR || process.env.SITE_NAME || '',
        category: frontmatter.category,
        creator: process.env.AUTHOR || process.env.SITE_NAME || '',
        generator: process.env.AUTHOR || process.env.SITE_NAME || '',
    }
}

const RemoteMdxPage = async (props: { params: Promise<{ post: number }> }) => {
    const params = await props.params
    const fetchedData = await fetchPostData(params)
    const source = fetchedData as ArticleDetail
    const frontmatter = {
        title: source?.post?.title || '',
        tags: source?.tags?.at(0)?.split(',') || [],
        date: source?.post?.createdAt.toString() || '',
        category: source?.category || '',
        thumbnail: '',
        viewCnt: String(source?.post?.views) || '',
    }
    const MdxComponent = async () => await CustomMdx({ source: source.post?.description })

    return (
        <Fragment>
            <MdxPage frontmatter={{ ...frontmatter }}>
                <MdxComponent />
            </MdxPage>
            <Comments post={params.post} />
            <ImageFallbackSetter />
        </Fragment>
    )
}
export default RemoteMdxPage
