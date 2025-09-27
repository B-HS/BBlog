import { Article } from '@entities/article'
import { Category } from '@entities/category'
import { Badge } from '@shared/ui/badge'
import { cn } from '@shared/utils'
import dayjs from 'dayjs'
import { LightbulbIcon } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { ArticleTagList } from './article-tag-list'

interface ArticleCardProps {
    article: Article & { tags?: string[] }
    category?: Category[]
}

export const ArticleCard: FC<ArticleCardProps> = ({ article, category }) => {
    return (
        <article
            key={article.postId}
            className={cn(
                article.isNotice && 'border bg-border/50',
                !!article.isHide && 'opacity-25',
                'p-3 rounded-sm shadow-sm hover:shadow-md transition-all duration-150 flex flex-col gap-1.5 dark:border hover:bg-border/50',
            )}>
            <Link href={`/article/${article.postId}`} prefetch={false} className='flex flex-col gap-1.5 cursor-pointer'>
                <header className='flex items-center justify-between gap-2'>
                    <Badge className='rounded-sm h-fit px-1'>
                        <span className='flex items-center gap-0.5 h-3'>
                            {article.isNotice && <LightbulbIcon size={12} fill='#FF0' />}
                            {category?.find((c) => c.categoryId === article.categoryId)?.category}
                        </span>
                    </Badge>
                    <time className='text-sm text-secondary-foreground/70 line-clamp-1' dateTime={article.updatedAt.toString()}>
                        {dayjs(article.updatedAt).format('YYYY-MM-DD')}
                    </time>
                </header>

                <h3 className='text-base font-bold w-fit line-clamp-1'>
                    {!!article.isHide && '[Deleted] '}
                    {article.title}
                </h3>
                <ArticleTagList article={article} />
            </Link>
        </article>
    )
}
