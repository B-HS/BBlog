'use client'

import { useGetCategoryList } from '@entities/category.client'
import { useGetTagList } from '@entities/tag.client'
import { Editor } from '@features/editor/editor'
import { Button } from '@ui/button'
import { ScrollArea } from '@ui/scroll-area'
import { CategorySelect } from '../category/category-select'
import { PostImages } from './post-images'
import { TagSelect } from '../tag/tag-select'
import { FC, ReactNode } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { PostHeader } from './post-header'
import { PostTagList } from './post-tag-list'
import dayjs from 'dayjs'

interface PostFormProps {
    title: string
    categoryId?: number
    tagIds: number[]
    content: string
    previewContent: ReactNode
    handleSave: (isPublished: boolean) => void
    setTitle: (title: string) => void
    setCategoryId: (categoryId: number) => void
    setTagIds: (tagIds: number[]) => void
    setContent: (content: string) => void
}

export const PostForm: FC<PostFormProps> = ({
    title,
    categoryId,
    tagIds,
    content,
    previewContent,
    handleSave,
    setTitle,
    setCategoryId,
    setTagIds,
    setContent,
}) => {
    const { data: tags } = useGetTagList()
    const { data: category } = useGetCategoryList()
    return (
        <Fragment>
            <div className='w-full md:w-1/2 h-full flex flex-col'>
                <div className='flex flex-col gap-3 p-3.5'>
                    <input
                        placeholder='제목을 입력해주세요'
                        type='text'
                        className='shadow-none focus-visible:ring-0 focus-visible:outline-none text-2xl font-bold'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        aria-label='제목'
                    />
                    <CategorySelect value={categoryId} onChange={setCategoryId} />
                    <TagSelect selectedTagIds={tagIds} onChange={setTagIds} />
                </div>
                <hr className='border-border' />
                <ScrollArea className='flex-1 min-h-0 p-3.5'>
                    <Editor content={content} setContent={setContent} />
                </ScrollArea>
                <hr className='border-border' />
                <PostImages />
                <hr className='border-border' />
                <div className='flex gap-2 p-3.5'>
                    <Button variant='outline' onClick={() => handleSave(false)} className='flex-1'>
                        임시저장
                    </Button>
                    <Button onClick={() => handleSave(true)} className='flex-1'>
                        발행
                    </Button>
                </div>
            </div>
            <div className='w-px h-full bg-border' />
            <div className='w-0 md:w-1/2 h-full overflow-scroll'>
                <article>
                    <PostHeader
                        title={title}
                        category={category?.find((c) => c.categoryId === categoryId)?.category}
                        createdAt={dayjs('2025-01-01').toDate()}
                    />
                    <div className='prose p-3.5'>{previewContent}</div>
                    <section className='p-3.5'>
                        <PostTagList tags={tags?.filter((tag) => tagIds?.includes(tag.tagId)) ?? []} />
                    </section>
                </article>
            </div>
        </Fragment>
    )
}
