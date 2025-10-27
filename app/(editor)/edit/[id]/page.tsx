'use client'

import { useGetPost, useUpdatePost } from '@entities/post.client'
import { toHTMLWithTOC } from '@features/editor/markdown'
import { useDebounce } from '@lib/hooks/use-debounce'
import { PostForm } from '@widgets/post/post-form'
import { ReactNode, useEffect, useState } from 'react'

const EditPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const [id, setId] = useState<string>('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState<number>()
    const [tagIds, setTagIds] = useState<number[]>([])
    const [previewContent, setPreviewContent] = useState<ReactNode>('')
    const [isInitialized, setIsInitialized] = useState(false)
    const debouncedContent = useDebounce(content, 100)

    const { data: post, isLoading } = useGetPost(id)
    const { mutate: updatePost } = useUpdatePost(id)

    const handleSave = (isPublished: boolean) => {
        if (!categoryId) return

        const postData = {
            title,
            description: content,
            categoryId,
            tagIds,
            isPublished,
        }
        updatePost(postData)
    }

    useEffect(() => {
        toHTMLWithTOC(debouncedContent).then(({ content }) => {
            setPreviewContent(content)
        })
    }, [debouncedContent])

    useEffect(() => {
        if (post && !isInitialized) {
            setTitle(post.title)
            setContent(post.description)
            setCategoryId(post.categoryId)
            setTagIds(post.tags?.map((tag) => tag.tagId) ?? [])
            setIsInitialized(true)
        }
    }, [post, isInitialized])

    useEffect(() => {
        params.then(({ id }) => setId(id))
    }, [params])

    if (!id || isLoading) {
        return (
            <main className='flex h-dvh items-center justify-center'>
                <div>로딩 중...</div>
            </main>
        )
    }

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

export default EditPage
