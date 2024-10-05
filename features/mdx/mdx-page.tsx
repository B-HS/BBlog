import { Tags } from '@features/common'
import { Badge } from '@shared/ui/badge'
import { Separator } from '@shared/ui/separator'
import dayjs from 'dayjs'
import { JSXElementConstructor, ReactElement } from 'react'
import { FrontmatterProps } from './custom-mdx'
interface MdxPageProps {
    content: ReactElement<any, string | JSXElementConstructor<any>>
    frontmatter: Partial<FrontmatterProps>
}

export const MdxPage = async ({ frontmatter, content }: MdxPageProps) => {
    return (
        <section className='flex relative'>
            <section className='prose prose-neutral dark:prose-invert container max-w-screen-lg py-7 bg-neutral-50 dark:bg-neutral-900 rounded my-5'>
                <section className='flex justify-between items-center flex-wrap gap-2'>
                    <section className='flex items-center space-x-2 min-h-5'>
                        <Badge className='text-nowrap' variant={'outline'}>
                            {frontmatter.category}
                        </Badge>
                        <Separator orientation='vertical' />
                        <span className='text-xl font-bold'>{frontmatter?.title}</span>
                    </section>

                    <section className='flex items-center space-x-2 min-h-5'>
                        <span>{dayjs(frontmatter?.date).format('YYYY-MM-DD')}</span>
                        <Separator orientation='vertical' />
                        <span>{frontmatter.viewCnt} views</span>
                    </section>
                </section>
                <Separator className='my-2' />
                <section className='flex flex-wrap gap-2 py-3 justify-end'>
                    <Tags tags={frontmatter?.tags} />
                </section>
                <section suppressHydrationWarning>{content}</section>
            </section>
        </section>
    )
}
