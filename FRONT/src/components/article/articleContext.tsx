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
    hide: boolean
    insertdate: null | string
    category?: string
    thumbnail?: string
    viewcount?: number
}

const ArticleContext = ({ data, category }: { data: Article; category: string }) => {
    return (
        <Flex className='posting flex-col flex-none w-full '>
            <header className='flex justify-between items-baseline'>
                <Flex className='gap-2 items-baseline'>
                    <span className='text-3xl'>{data.title}</span>
                    <span> | </span>
                    <span className='text-sm'>{category.toUpperCase()}</span>
                </Flex>
                <Flex className='gap-2'>
                    <span className='text-sm'>{dayjs(data.insertdate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm')}</span>
                    <span className='text-sm'> | </span>
                    <span className='text-sm'>{data.viewcount || 0} views</span>
                </Flex>
            </header>
            <Separator className='my-3' />
            <div className='p-3.5' dangerouslySetInnerHTML={{ __html: data.context ? data.context : '' }}></div>
            <Flex className='p-0 gap-2 flex-wrap'>
                {data.tags?.map((tag, idx) => (
                    <Badge variant='outline' className='rounded py-2 dark:shadow-neutral-900 shadow-sm' key={idx}>
                        {tag.toUpperCase()}
                    </Badge>
                ))}
            </Flex>
        </Flex>
    )
}

export default ArticleContext
