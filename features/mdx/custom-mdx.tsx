// eslint-disable-next-line import/no-named-as-default
import rehypePrettyCode from 'rehype-pretty-code'

import { MDXRemoteProps, compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { CustomComponents } from './custom-components'
import { remarkVideos } from './video-remark'

export interface FrontmatterProps {
    title: string
    tags: string[]
    date: string
    category: string
    thumbnail: string
    viewCnt?: string
    file?: string
}

export const CustomMdx = async (opts: MDXRemoteProps) => {
    const { source } = opts
    const { content, frontmatter } = await compileMDX<Partial<FrontmatterProps>>({
        source,
        components: CustomComponents,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm, remarkVideos],
                rehypePlugins: [[rehypePrettyCode, { theme: 'dark-plus' }]],
            },
        },
    })

    return { content, frontmatter }
}
