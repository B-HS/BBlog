import { CustomMdx, MdxPage } from '@features/mdx'
import { Comments } from '@features/mdx/comments'
import { markdownToText } from '@shared/utils'
import fs from 'fs'
import { Metadata } from 'next'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import path from 'path'

export const generateMetadata = async ({ params }: { params: { post: string } }): Promise<Metadata> => {
    const source = (await getPostSource(params.post)) as MDXRemoteProps['source']
    const { frontmatter } = await CustomMdx({ source })
    const context = (markdownToText(source?.toString().slice(0, 250)) || frontmatter.title || '')?.replace(/<\/?[^>]+(>|$)/g, '') + '...'

    return {
        title: {
            template: '%s | HS',
            default: frontmatter.title || 'Article',
        },
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

const getPostSource = async (postName: string) => {
    const filePath = path.join(process.cwd(), 'public', 'post', `${postName}.mdx`)
    try {
        return await fs.promises.readFile(filePath, 'utf8')
    } catch (error) {
        console.error(error)
    }
}

const getCommentList = async (postName: string) => {
    path.join(process.cwd(), 'public', 'post', `${postName}.mdx`)
    return Promise.resolve([])
}

const manageViewCnt = async (postName: string) => {
    path.join(process.cwd(), 'public', 'post', `${postName}.mdx`)
    return Promise.resolve('0')
}

const RemoteMdxPage = async ({ params }: { params: { post: string } }) => {
    const source = (await getPostSource(params.post)) as MDXRemoteProps['source']
    const viewCnt = await manageViewCnt(params.post)
    const comments = await getCommentList(params.post)

    const { content, frontmatter } = await CustomMdx({ source })

    return (
        <>
            <MdxPage content={content} frontmatter={{ ...frontmatter, viewCnt }} />
            <Comments comments={comments} post={params.post} />
        </>
    )
}
export default RemoteMdxPage
