import dayjs from 'dayjs'
import { JSXElementConstructor, ReactElement } from 'react'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'
import { FrontmatterProps } from './custom-mdx'
import Tags from '../post/tags'
import dynamic from 'next/dynamic'
import { TocProps } from './toc'
interface MdxPageProps {
    content: ReactElement<any, string | JSXElementConstructor<any>>
    frontmatter: Partial<FrontmatterProps>
    toc: TocProps[]
}

const Toc = dynamic(() => import('./toc'), { ssr: false })
const MdxPage = async ({ frontmatter, content, toc }: MdxPageProps) => {
    return (
        <section className='flex relative'>
            <section className='prose prose-neutral dark:prose-invert container max-w-screen-lg py-7 bg-neutral-50 dark:bg-neutral-900 rounded my-5'>
                <section className='flex justify-between items-center flex-wrap'>
                    <section className='flex items-center space-x-2 h-5'>
                        <Badge variant={'outline'}>{frontmatter.category}</Badge>
                        <Separator orientation='vertical' />
                        <span className='text-xl font-bold'>{frontmatter?.title}</span>
                    </section>

                    <section className='flex items-center space-x-2 h-5'>
                        <span>{dayjs(frontmatter?.date).format('YYYY-MM-DD')}</span>
                        <Separator orientation='vertical' />
                        <span>{frontmatter.viewCnt} views</span>
                    </section>
                </section>
                <Separator className='my-2' />
                <section className='flex flex-wrap gap-2 py-3 justify-end'>
                    <Tags tags={frontmatter?.tags} />
                </section>
                <section>{content}</section>
            </section>
            <div>
                <Toc toc={toc} />
            </div>
        </section>
    )
}
export default MdxPage
