import { compile, run } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'
import { CustomComponents } from './custom-components'

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
    const code = String(await compile(source, { outputFormat: 'function-body' }))
    const { default: MdxComponent } = await run(code, {
        ...runtime,
        baseUrl: process.env.SITE_URL,
    })
    return <MdxComponent components={CustomComponents} />
}
