import { Post } from '@/entities/post'
import { Badge } from '@/shared/ui'
import { toHTMLWithTOC } from '@/shared/utils/unified'
import dayjs from 'dayjs'
import DOMPurify from 'isomorphic-dompurify'

export const PostDetail = async ({ post }: { post: Post }) => {
    const { title, categories, createdAt, description, tags } = post
    const { html } = await toHTMLWithTOC(description)
    return (
        <article className='flex flex-col gap-2 w-full px-2 py-5 rounded'>
            <section className='flex gap-2'>
                {categories?.map((cateogry) => (
                    <Badge key={cateogry.id} className='rounded-sm text-nowrap' variant={'outline'}>
                        {cateogry.name}
                    </Badge>
                ))}
                <h1 className='font-bold p-0 m-0! border-none text-lg! sm:text-xl! w-full'>{title}</h1>
                <span className='whitespace-nowrap'>{dayjs(createdAt).format('YYYY-MM-DD')}</span>
            </section>
            <hr className='my-2' />
            <div className='markdown-prose' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }} />
            <section className='flex flex-col gap-1'>
                <section className='flex flex-wrap justify-start gap-2 py-3'>
                    {tags?.map((tag) => (
                        <Badge key={tag.id} className='rounded-sm text-nowrap' variant={'outline'}>
                            {tag.name}
                        </Badge>
                    ))}
                </section>
            </section>
        </article>
    )
}
