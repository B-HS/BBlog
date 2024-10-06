import { Tags } from '@features/common'
import { Badge } from '@shared/ui/badge'
import { Separator } from '@shared/ui/separator'
import dayjs from 'dayjs'
import { JSXElementConstructor, ReactElement } from 'react'
import { FrontmatterProps } from './custom-mdx'
interface MdxPageProps {
    content: ReactElement<any, string | JSXElementConstructor<any>>
    frontmatter: Pick<FrontmatterProps, 'category' | 'date' | 'tags' | 'title' | 'viewCnt'>
}

export const MdxPage = async ({ frontmatter, content }: MdxPageProps) => {
    return (
        <section className='flex relative'>
            <section className='prose prose-neutral dark:prose-invert container max-w-screen-lg py-7 rounded my-5'>
                <section className='flex justify-between items-center flex-wrap gap-2'>
                    <section className='flex items-center space-x-2 min-h-5'>
                        <Badge className='text-nowrap rounded-sm' variant={'outline'}>
                            {frontmatter.category}
                        </Badge>
                        <Separator orientation='vertical' />
                        <h1 className='text-xl font-bold p-0 !m-0 border-none'>{frontmatter?.title}</h1>
                    </section>

                    <section className='flex items-center space-x-2 min-h-5'>
                        <span>{dayjs(frontmatter?.date).format('YYYY-MM-DD')}</span>
                        <Separator orientation='vertical' />
                        <span>{frontmatter.viewCnt} views</span>
                    </section>
                </section>
                <Separator className='my-2' />
                <section className='flex flex-wrap gap-2 py-3 justify-start'>
                    <Tags tags={frontmatter?.tags} />
                </section>
                <section suppressHydrationWarning>{content}</section>
            </section>
        </section>
    )
}
