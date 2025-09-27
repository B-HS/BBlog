import { Tags } from '@features/common'
import { Badge } from '@shared/ui/badge'
import { Separator } from '@shared/ui/separator'
import dayjs from 'dayjs'
import { ReactElement } from 'react'
import { FrontmatterProps } from './custom-mdx'
import { FloatingMenu } from './floating-menu'
interface MdxPageProps {
    frontmatter: Pick<FrontmatterProps, 'category' | 'date' | 'tags' | 'title' | 'viewCnt'>
    children: ReactElement
}

export const MdxPage = async ({ frontmatter, children }: MdxPageProps) => {
    return (
        <div className='relative flex'>
            <aside aria-label='Table of contents'>
                <FloatingMenu />
            </aside>
            <article className='w-full px-3 py-5 rounded markdown-prose'>
                <header className='flex flex-wrap items-center justify-between gap-2'>
                    <div className='flex items-center space-x-2 min-h-5'>
                        <Badge className='rounded-sm text-nowrap' variant={'outline'}>
                            {frontmatter.category}
                        </Badge>
                        <Separator orientation='vertical' />
                        <h1 className='font-bold p-0 m-0! border-none text-lg! sm:text-xl!'>{frontmatter?.title}</h1>
                    </div>

                    <div className='flex items-center space-x-2 min-h-5'>
                        <time dateTime={frontmatter?.date}>{dayjs(frontmatter?.date).format('YYYY-MM-DD')}</time>
                    </div>
                </header>
                <Separator className='my-2' />
                <section>{children}</section>
                <Separator className='my-2' />
                <footer className='flex flex-col gap-1'>
                    <div className='flex flex-wrap justify-start gap-2 py-3'>
                        <Tags tags={frontmatter?.tags} />
                    </div>
                </footer>
            </article>
        </div>
    )
}
