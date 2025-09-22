'use client'

import { cn } from '@/shared/utils'
import { Post } from '@entities/post'
import { Badge } from '@shared/ui'
import { buttonVariants } from '@shared/ui/button'
import dayjs from 'dayjs'
import { LightbulbIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface PostCardProps {
    post: Post
    headingLevel?: 'h2' | 'h3' | 'h4'
}

export const PostCard: FC<PostCardProps> = ({ post, headingLevel = 'h3' }) => {
    const router = useRouter()
    const Heading = headingLevel

    return (
        <article
            onClick={() => router.push(`/post/${post.postId}`)}
            aria-labelledby={`post-${post.postId}-title`}
            aria-describedby={`post-${post.postId}-meta`}
            className={cn(
                post.isNotice && 'border bg-border/50',
                !!post.isHide && 'opacity-25',
                'p-3 rounded-sm shadow-sm hover:shadow-md transition-all duration-150 flex flex-col gap-1.5 dark:border hover:bg-border/50 cursor-pointer',
            )}>
            <div className='flex items-center justify-between gap-2'>
                {post.categories.length > 0 &&
                    post.categories.map((category) => (
                        <Badge className='rounded-sm h-fit px-1' key={category.id}>
                            <span className='flex items-center gap-0.5 h-3'>
                                {post.isNotice && <LightbulbIcon size={12} fill='#FF0' aria-hidden='true' />}
                                {category.name}
                            </span>
                        </Badge>
                    ))}
                <time
                    id={`post-${post.postId}-meta`}
                    className='text-sm text-secondary-foreground/70 line-clamp-1'
                    dateTime={dayjs(post.createdAt).toISOString()}
                    aria-label={dayjs(post.createdAt).format('YYYY년 MM월 DD일')}>
                    {dayjs(post.createdAt).format('YYYY-MM-DD')}
                </time>
            </div>

            <Heading id={`post-${post.postId}-title`} className='text-base font-bold cursor-pointer w-fit line-clamp-1'>
                <Link href={`/article/${post.postId}`} className='focus:outline-none focus:ring'>
                    {!!post.isHide && '[Deleted] '}
                    {post.title}
                </Link>
            </Heading>

            {post.tags?.length ? (
                <div className='flex items-center gap-2 overflow-scroll'>
                    {post.tags.map((tag) => (
                        <Link
                            href={`/tag/${tag.id}`}
                            key={tag.id}
                            className={cn(
                                buttonVariants({ variant: 'outline', size: 'sm' }),
                                'rounded-sm p-0.5 px-1.5 h-fit text-sm cursor-pointer font-normal leading-tight',
                            )}>
                            {tag.name}
                        </Link>
                    ))}
                </div>
            ) : null}
        </article>
    )
}
