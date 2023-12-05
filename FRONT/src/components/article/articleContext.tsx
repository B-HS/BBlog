import { Article } from '@/app/[category]/[aid]/page'
import dayjs from 'dayjs'
import Flex from '../flex'
import { Badge } from '../ui/badge'
import { Separator } from '../ui/separator'

const ArticleContext = ({ data, category }: { data: Article; category: string }) => {
    return (
        <Flex className='posting flex-col flex-none w-full'>
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
            <Flex>
                {data.tags.map((tag, idx) => (
                    <Badge variant='outline' className='rounded' key={idx}>
                        {tag.toUpperCase()}
                    </Badge>
                ))}
            </Flex>
            <div className='p-10' dangerouslySetInnerHTML={{ __html: data.context }}></div>
        </Flex>
    )
}

export default ArticleContext
