import { ArticleDetail } from '@entities/article'
import { CustomMdx, MdxPage } from '@features/mdx'
import { Comments } from '@features/mdx/comments'
import { useCurrentPath } from '@shared/hooks'
import { markdownToText } from '@shared/utils'
import { Metadata } from 'next'
import { Fragment } from 'react'

export const generateMetadata = async ({ params }: { params: { post: string } }): Promise<Metadata> => {
    const fetchedData = await fetch(`${process.env.NEXTAUTH_URL}/api/article/${params.post}`).then((res) => res.json())
    const source = fetchedData as ArticleDetail
    const frontmatter = {
        title: source?.post?.title || '',
        tags: source?.tags || [],
        date: source?.post?.createdAt || '',
        category: source?.category || '',
        thumbnail: '',
        viewCnt: source?.post?.views || '',
    }
    const context =
        (markdownToText(source?.post.description.toString().slice(0, 250)) || frontmatter.title || '')?.replace(/<\/?[^>]+(>|$)/g, '') + '...'

    return {
        title: frontmatter.title,
        description: context || `Article | ${process.env.SITE_NAME}`,
        keywords: frontmatter.tags?.join(', ') || `Article | ${process.env.SITE_NAME}`,
        openGraph: {
            title: frontmatter.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            images: [
                {
                    url: `${frontmatter?.thumbnail}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            images: {
                url: `${frontmatter?.thumbnail}`,
                alt: 'Post thumbnail',
            },
            title: frontmatter.title,
            description: context || `Article | ${process.env.SITE_NAME}`,
            creator: process.env.AUTHOR || process.env.SITE_NAME || '',
            creatorId: params.post,
        },
    }
}

const RemoteMdxPage = async ({ params }: { params: { post: string } }) => {
    const { url } = useCurrentPath()
    const fetchedData = await fetch(`${url}/api/article/${params.post}`).then((res) => res.json())
    const source = fetchedData as ArticleDetail
    const frontmatter = {
        title: source?.post?.title || '',
        tags: source?.tags.at(0)?.split(',') || [],
        date: source?.post?.createdAt.toString() || '',
        category: source?.category || '',
        thumbnail: '',
        viewCnt: String(source?.post?.views) || '',
    }
    const { content } = await CustomMdx({ source: source.post.description })

    return (
        <Fragment>
            <MdxPage content={content} frontmatter={{ ...frontmatter }} />
            <Comments comments={source.comments || []} post={params.post} />
        </Fragment>
    )
}
export default RemoteMdxPage
