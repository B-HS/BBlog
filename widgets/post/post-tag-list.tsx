'use client'

import { Tag } from '@entities/tag'
import { cn } from '@lib/utils'
import { buttonVariants } from '@ui/button'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface PostTagListProps {
    tags?: Tag[]
}

export const PostTagList: FC<PostTagListProps> = ({ tags }) => {
    const router = useRouter()
    const handleTagClick = (tag: Tag) => {
        router.push(`/article?tagId=${tag.tagId}`)
    }
    return (
        <section className='flex items-center gap-2 overflow-scroll'>
            {tags?.map((tag) => (
                <span
                    onClick={(e) => {
                        e.preventDefault()
                        handleTagClick(tag)
                    }}
                    key={tag.tagId}
                    className={cn(
                        buttonVariants({ variant: 'outline', size: 'sm' }),
                        'rounded p-0.5 px-1.5 h-fit text-sm cursor-pointer font-normal leading-tight',
                    )}>
                    {tag.tag}
                </span>
            ))}
        </section>
    )
}
