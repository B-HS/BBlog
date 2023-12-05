import dayjs from 'dayjs'
import Flex from '../flex'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'

export interface Article {
    aid: number
    title: string
    context: string
    tags: string[]
    mekey: number
    fileseq: null | number
    hide: boolean
    github: null | string
    publishlink: null | string
    insertDate: null | string
}

const ArticleContext = ({ data, category }: { data: Article; category: string }) => {
    return (
        <Flex className='posting flex-col flex-none w-full '>
            <header className='flex justify-between items-baseline'>
                <Flex className='gap-2 items-baseline'>
                    <span className='text-5xl'>{data.title}</span>
                    <span> | </span>
                    <span className='text-sm'>{category.toUpperCase()}</span>
                </Flex>
                <Flex>
                    <span className='text-sm'>{dayjs(data.insertDate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm')}</span>
                </Flex>
            </header>
            <Separator className='my-3' />
            <div className='p-10' dangerouslySetInnerHTML={{ __html: data.context }}></div>
            <Flex className='p-0 gap-2 flex-wrap'>
                {data.tags.map((tag, idx) => (
                    <Badge variant='outline' className='rounded py-2 dark:shadow-neutral-900 shadow-md' key={idx}>
                        {tag.toUpperCase()}
                    </Badge>
                ))}
            </Flex>
        </Flex>
    )
}

export default ArticleContext
