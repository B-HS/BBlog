'use client'

import { ArticleDetail } from '@entities/article'
import { EditCategory, EditDescription, EditImageManager, EditTags, EditTitle } from '@features/article/edit'
import { Button } from '@shared/ui/button'
import { useToast } from '@shared/ui/use-toast'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

const imageObjDefaultValue = {
    src: '',
    alt: '',
    width: '',
    height: '',
    imgInput: '',
}

export type RequestPostDataType = {
    postId?: number
    categoryId: number | undefined
    title: string
    description: string
    tags: string[]
}

export type EditorProps = {
    text?: string
    post?: ArticleDetail
    submitFn: (post: RequestPostDataType) => Promise<{ postId: number }>
}

export const Editor: FC<EditorProps> = ({ text, post, submitFn }) => {
    const { toast } = useToast()
    const router = useRouter()
    const [imageObj, setImageObj] = useState<Record<string, string | number>>(imageObjDefaultValue)

    const [category, setCategory] = useState<number>()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState(text || '')
    const [tags, setTags] = useState<string[]>([])

    const handleSave = async () => {
        const isValidated = [category, title, description].find((item) => !item)
        console.log(isValidated)
        if (!!isValidated) {
            toast({
                title: 'Not all fields are filled',
                description: 'Please fill in all the fields',
                variant: 'destructive',
            })
            return
        }

        const postData = {
            categoryId: category,
            title,
            description,
            tags,
        }
        const result = await submitFn(postData)

        result.postId && router.push(`/article/${result.postId}`)
    }

    const frontmatter = {
        title: post?.post?.title || '',
        tags: post?.tags.at(0)?.split(',') || [],
        date: post?.post?.createdAt.toString() || '',
        category: post?.category || '',
        thumbnail: '',
        viewCnt: String(post?.post?.views) || '',
    }

    useEffect(() => {
        if (post) {
            setCategory(post?.categoryId)
            setTitle(post?.post?.title || '')
            setDescription(post?.post?.description || '')
            setTags(post?.tags.at(0)?.split(',') || [])
        }
    }, [post])

    return (
        <section className='flex flex-col gap-5 p-2'>
            <EditCategory currentCategory={category} setCurrentCategory={setCategory} />
            <EditTitle title={title} setTitle={setTitle} />
            <EditDescription description={description} setDescription={setDescription} setImageObj={setImageObj} />
            <EditImageManager imageObj={imageObj} setImageObj={setImageObj} />
            <EditTags setTags={setTags} tags={tags} />
            <Button onClick={handleSave}>Save</Button>
        </section>
    )
}
