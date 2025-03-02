import { CustomComponents, remarkContent } from '@features/mdx'
import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

export interface FrontmatterProps {
    title: string
    tags: string[]
    date: string
    category: string
    thumbnail: string
    viewCnt?: string
    file?: string
}

type CustomMdxProps = { source: string }
export const CustomMdx = async ({ source }: CustomMdxProps) => {
    const code = String(
        await compile(source, {
            outputFormat: 'function-body',
            remarkPlugins: [remarkGfm, remarkContent],
            rehypePlugins: [[rehypePrettyCode, { theme: 'dark-plus' }]],
        }),
    )
    const { default: MdxComponent } = await run(code, {
        ...runtime,
        baseUrl: process.env.SITE_URL,
    })
    return <MdxComponent components={CustomComponents} />
}
