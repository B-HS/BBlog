import { getPostList } from '@entities/post'
import { Badge } from '@ui/badge'
import { cn } from '@lib/utils'
import dayjs from 'dayjs'
import { LightbulbIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { PostTagList } from './post-tag-list'

interface PostCardProps {
    post: Awaited<ReturnType<typeof getPostList>>['data'][number]
}

export const PostCard: FC<PostCardProps> = ({ post }) => {
    return (
        <article
            key={post.postId}
            className={cn(
                post.isNotice && 'border bg-border/50',
                !!post.isHide && 'opacity-25',
                'p-3 rounded shadow-sm hover:shadow-md transition-all duration-150 flex flex-col gap-1.5 border hover:bg-border/50',
            )}>
            <Link href={`/article/${post.postId}`} prefetch={false} className='flex flex-col gap-1.5 cursor-pointer'>
                <header className='flex items-center justify-between gap-2'>
                    <Badge className='rounded-xs h-fit px-1'>
                        <span className='flex items-center gap-0.5 h-3'>
                            {post.isNotice && <LightbulbIcon size={12} fill='#FF0' aria-label='공지사항' />}
                            {post.categoryName}
                        </span>
                    </Badge>
                    <time className='text-sm text-secondary-foreground/70 line-clamp-1' dateTime={dayjs(post.updatedAt).format('YYYY-MM-DD')}>
                        {dayjs(post.updatedAt).format('YYYY-MM-DD')}
                    </time>
                </header>

                <h3 className='text-base font-bold w-fit line-clamp-1'>
                    {!!post.isHide && '[Deleted] '}
                    {post.title}
                </h3>
                <PostTagList tags={post.tags ?? []} />
            </Link>
        </article>
    )
}
