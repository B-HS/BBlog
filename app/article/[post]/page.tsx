import { CustomMdx } from '@/components/mdx/custom-mdx'
import Fallback from '@/components/fall-back'
import MdxPage from '@/components/mdx/mdx-page'

import { getStartEndDate, markdownToText } from '@/lib/utils'
import { createClient } from '@/utils/supabase/server'
import fs from 'fs'
import { Metadata } from 'next'
import { MDXRemoteProps } from 'next-mdx-remote/rsc'
import { cookies, headers } from 'next/headers'
import path from 'path'
import { Suspense } from 'react'

export const generateMetadata = async ({ params }: { params: { post: string } }): Promise<Metadata> => {
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')
    const currentURL = `${origin}://${domain}/image/`
    const source = (await getPostSource(params.post)) as MDXRemoteProps['source']
    const { frontmatter } = await CustomMdx({ source })
    const context = (markdownToText(source.toString().slice(0, 250)) || frontmatter.title || '').replace(/<\/?[^>]+(>|$)/g, '') + '...'

    return {
        title: {
            template: '%s | HS',
            default: frontmatter.title || 'Article',
        },
        description: context || 'Article | BBlog',
        keywords: frontmatter.tags?.join(', ') || 'Article | BBlog',
        openGraph: {
            title: frontmatter.title,
            description: context || 'Article | BBlog',
            images: [
                {
                    url: `${currentURL}${frontmatter?.thumbnail}`,
                    width: 1200,
                    height: 630,
                },
            ],
        },
        twitter: {
            images: {
                url: `${currentURL}${frontmatter?.thumbnail}`,
                alt: 'Post thumbnail',
            },
            title: frontmatter.title,
            description: context || 'Article | BBlog',
            creator: 'Hyunseok Byun',
            creatorId: params.post,
        },
    }
}

const getPostSource = async (postName: string) => {
    const filePath = path.join(process.cwd(), 'public', 'post', `${postName}.mdx`)
    try {
        return await fs.promises.readFile(filePath, 'utf8')
    } catch (error) {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        supabase.from('errors').insert({ error: JSON.stringify(error) })
    }
}

const manageViewCnt = async (postName: string): Promise<string> => {
    try {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const postinfo = await Promise.all([supabase.from('post').insert({ post: postName }), supabase.from('post').select('*')])
        const { data } = postinfo[1]

        return String(data?.length || 0)
    } catch (error) {
        return 'NONE'
    }
}

const RemoteMdxPage = async ({ params }: { params: { post: string } }) => {
    const source = (await getPostSource(params.post)) as MDXRemoteProps['source']
    const viewCnt = await manageViewCnt(params.post)
    const { content, frontmatter } = await CustomMdx({ source })
    return (
        <Suspense fallback={<Fallback />}>
            <MdxPage content={content} frontmatter={{ ...frontmatter, viewCnt }} />
        </Suspense>
    )
}
export default RemoteMdxPage
