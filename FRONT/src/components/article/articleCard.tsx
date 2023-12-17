import dayjs from 'dayjs'
import { CalendarIcon, Layers3Icon } from 'lucide-react'
import Link from 'next/link'
import Flex from '../flex'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Badge } from '../ui/badge'
import { Article } from './articleContext'

const ArticleCard = ({ article }: { article: Article }) => {
    const { aid, title, context, tags, insertdate, category: rawCategory, thumbnail } = article
    const category = rawCategory?.toLowerCase()

    return (
        <Flex className='border w-full p-0 overflow-hidden lg:h-[266px] flex-col lg:flex-row hover:shadow-lg dark:shadow-neutral-900 transition-all hover:border-2'>
            <Link className='h-100 w-100 aspect-video lg:aspect-square rounded-none' href={`/${category}/${aid}`}>
                <Avatar className='h-100 w-100 aspect-video lg:aspect-square rounded-none'>
                    <AvatarImage className='object-fill' src={thumbnail ? `https://img.gumyo.net/${thumbnail}` : 'favicon.ico'} />
                    <AvatarFallback className='lg:aspect-square rounded-none'>{`ARTICLE_${aid}_LOGO`}</AvatarFallback>
                </Avatar>
            </Link>
            <Flex className='flex-col justify-between gap-3.5 text-sm'>
                <Flex className='flex-col gap-2.5 items-baseline overflow-hidden'>
                    <Flex className='gap-2 opacity-50 items-center flex-wrap'>
                        <Flex className='gap-2 items-center p-0'>
                            <Layers3Icon className='w-3.5' />
                            <span>{(category as string).toUpperCase()}</span>
                        </Flex>
                        <Flex className='gap-2 items-center p-0'>
                            <CalendarIcon className='w-3.5' />
                            <span>{dayjs(insertdate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm')}</span>
                        </Flex>
                    </Flex>
                    <Link href={`/${category}/${aid}`}>
                        <span className='pl-3 font-bold text-3xl'>{title}</span>
                    </Link>
                    <Flex className='flex-col overflow-ellipsis h-[9.75rem] lg:h-auto p-5'>
                        <Link className='h-100 w-100 aspect-video lg:aspect-square rounded-none' href={`/${category}/${aid}`}>
                            {context
                                .replace(/<\/?[^>]+(>|$)/g, '')
                                .replace(/&nbsp;/g, ' ')
                                .slice(0, 500) + '...'}
                        </Link>
                    </Flex>
                </Flex>
                <Flex className='pl-5'>
                    {tags?.map((tag, idx) => (
                        <Badge variant='outline' className='rounded py-2 dark:shadow-neutral-900 shadow-sm' key={idx}>
                            {tag.toUpperCase()}
                        </Badge>
                    ))}
                </Flex>
            </Flex>
        </Flex>
    )
}

export default ArticleCard
