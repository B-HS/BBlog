'use client'

import { ArticleDetail } from '@entities/article'
import { Editor, RequestPostDataType } from '@widgets/article/editor'
import { useEffect, useState } from 'react'

const EditPage = ({ params }: { params: { postId: number } }) => {
    const [post, setPost] = useState<ArticleDetail>()
    const requestAddPost = async (post: RequestPostDataType) =>
        await fetch(`/api/article/${params.postId}`, {
            method: 'PUT',
            body: JSON.stringify(post),
        }).then(async (res) => (await res.json()) as { postId: number })

    useEffect(() => {
        fetch(`/api/article/${params.postId}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
    }, [params.postId])

    return <Editor submitFn={requestAddPost} post={post} />
}

export default EditPage
