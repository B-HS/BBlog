'use client'

import { useCreatePost } from '@entities/post.client'
import { toHTMLWithTOC } from '@features/editor/markdown'
import { useDebounce } from '@lib/hooks/use-debounce'
import { PostForm } from '@widgets/post/post-form'
import { ReactNode, useEffect, useState } from 'react'

const WritePage = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState<number>()
    const [tagIds, setTagIds] = useState<number[]>([])
    const [previewContent, setPreviewContent] = useState<ReactNode>('')
    const debouncedContent = useDebounce(content, 100)
    const { mutate: createPost } = useCreatePost()

    const handleSave = (isPublished: boolean) => {
        if (!categoryId) return

        const postData = {
            title,
            description: content,
            categoryId,
            tagIds,
            isPublished,
        }
        createPost(postData)
    }

    useEffect(() => {
        toHTMLWithTOC(debouncedContent).then(({ content }) => {
            setPreviewContent(content)
        })
    }, [debouncedContent])

    return (
        <main className='flex h-dvh'>
            <PostForm
                title={title}
                categoryId={categoryId}
                tagIds={tagIds}
                content={content}
                previewContent={previewContent}
                handleSave={handleSave}
                setTitle={setTitle}
                setCategoryId={setCategoryId}
                setTagIds={setTagIds}
                setContent={setContent}
            />
        </main>
    )
}

export default WritePage
