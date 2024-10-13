import { Article } from '@entities/article'
import { Category } from '@entities/category'
import { Badge } from '@shared/ui/badge'
import { buttonVariants } from '@shared/ui/button'
import { cn } from '@shared/utils'
import dayjs from 'dayjs'
import { LightbulbIcon } from 'lucide-react'
import Link from 'next/link'

export const ArticleCard = ({ article, category }: { article: Article & { tags?: string[] }; category?: Category[] }) => {
    return (
        <section
            key={article.postId}
            className={cn(
                article.isNotice && 'border bg-border/50',
                'p-3 rounded-sm shadow hover:shadow-md transition-shadow flex flex-col gap-1.5 dark:border',
            )}>
            <section className='flex items-center justify-between gap-2'>
                <Badge className='rounded-sm h-fit px-1.5'>
                    <section className='flex items-center gap-0.5 h-3'>
                        {article.isNotice && <LightbulbIcon className='pb-0.5' size={14} fill='#FF0' />}
                        {category?.find((c) => c.categoryId === article.categoryId)?.category}
                    </section>
                </Badge>
                <p className='text-sm text-secondary-foreground/70 line-clamp-1'>{dayjs(article.updatedAt).format('YYYY-MM-DD')}</p>
            </section>
            <Link href={`/article/${article.postId}`}>
                <p className='text-lg font-bold cursor-pointer underline-effect w-fit'>{article.title}</p>
            </Link>
            <section className='flex items-center gap-2'>
                {article.tags?.map((tag) => (
                    <Link
                        href={`/tag/${tag}`}
                        key={tag}
                        className={cn(buttonVariants({ variant: 'outline', size: 'sm' }), 'rounded-sm p-0.5 px-1.5 h-fit text-sm cursor-pointer')}>
                        # {tag}
                    </Link>
                ))}
            </section>
        </section>
    )
}
