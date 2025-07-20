'use client'

import { Article } from '@entities/article'
import { buttonVariants } from '@shared/ui/button'
import { cn } from '@shared/utils'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface ArticleTagListProps {
    article: Article & { tags?: string[] }
}

export const ArticleTagList: FC<ArticleTagListProps> = ({ article }) => {
    const router = useRouter()

    const handleTagClick = (e: React.MouseEvent<HTMLSpanElement>, tag: string) => {
        e.preventDefault()
        router.push(`/tag/${tag}`)
    }

    return (
        <section className='flex items-center gap-2 overflow-scroll'>
            {article.tags?.map((tag) => (
                <span
                    onClick={(e) => handleTagClick(e, tag)}
                    key={tag}
                    className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'rounded-sm p-0.5 px-1.5 h-fit text-sm cursor-pointer font-normal leading-tight',
                    )}>
                    {tag}
                </span>
            ))}
        </section>
    )
}
