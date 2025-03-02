import { Tags } from '@features/common'
import { Badge } from '@shared/ui/badge'
import { Separator } from '@shared/ui/separator'
import dayjs from 'dayjs'
import { JSXElementConstructor, ReactElement } from 'react'
import { FrontmatterProps } from './custom-mdx'
import { FloatingMenu } from './floating-menu'
interface MdxPageProps {
    content: ReactElement<any, string | JSXElementConstructor<any>>
    frontmatter: Pick<FrontmatterProps, 'category' | 'date' | 'tags' | 'title' | 'viewCnt'>
}

export const MdxPage = async ({ frontmatter, content }: MdxPageProps) => {
    return (
        <section className='relative flex'>
            <FloatingMenu />
            <section className='w-full px-3 py-5 rounded markdown-prose'>
                <section className='flex flex-wrap items-center justify-between gap-2'>
                    <section className='flex items-center space-x-2 min-h-5'>
                        <Badge className='rounded-sm text-nowrap' variant={'outline'}>
                            {frontmatter.category}
                        </Badge>
                        <Separator orientation='vertical' />
                        <h1 className='font-bold p-0 m-0! border-none text-lg! sm:text-xl!'>{frontmatter?.title}</h1>
                    </section>

                    <section className='flex items-center space-x-2 min-h-5'>
                        <span>{dayjs(frontmatter?.date).format('YYYY-MM-DD')}</span>
                        <Separator orientation='vertical' />
                        <span>{frontmatter.viewCnt} views</span>
                    </section>
                </section>
                <Separator className='my-2' />
                <section suppressHydrationWarning>{content}</section>
                <Separator className='my-2' />
                <section className='flex flex-col gap-1'>
                    <section className='flex flex-wrap justify-start gap-2 py-3'>
                        <Tags tags={frontmatter?.tags} />
                    </section>
                </section>
            </section>
        </section>
    )
}
