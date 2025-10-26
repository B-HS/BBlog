import { cn } from '@lib/utils'
import { Badge } from '@ui/badge'
import dayjs from 'dayjs'
import { Calendar } from 'lucide-react'
import { type FC } from 'react'

interface PostHeaderProps {
    title: string
    createdAt: Date
    category: string
}

export const PostHeader: FC<Partial<PostHeaderProps>> = ({ title, createdAt, category }) => {
    return (
        <header className='backdrop-blur-sm bg-background/80 flex gap-1 items-center justify-between border-b border-border px-3 py-0.5 sm:px-3 sm:py-2 flex-wrap'>
            <div className='flex gap-3 items-center'>
                <nav className='flex gap-1 items-center'>
                    {category && (
                        <Badge variant='outline' className='rounded py-1.25'>
                            {category}
                        </Badge>
                    )}
                </nav>
                <h1
                    className={cn(
                        'text-sm sm:text-lg font-semibold py-2 line-clamp-2 text-pretty cursor-default',
                        !title && 'text-muted-foreground',
                    )}>
                    {title || '제목을 입력해주세요'}
                </h1>
            </div>
            <div className='flex gap-1 sm:gap-2 text-xs sm:text-sm px-1 pb-2 sm:px-0 sm:pb-0 w-full sm:w-fit justify-end'>
                <div className='flex gap-1 items-center'>
                    <Calendar className='size-3.5' />
                    <span className='text-primary font-medium'>{createdAt ? dayjs(createdAt).format('YYYY.MM.DD') : '2025.01.01'}</span>
                </div>
            </div>
        </header>
    )
}
