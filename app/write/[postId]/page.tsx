'use client'

import { ArticleDetail } from '@entities/article'
import { Editor, RequestPostDataType } from '@widgets/article/editor'
import { use, useEffect, useState } from 'react'

const EditPage = (props: { params: Promise<{ postId: number }> }) => {
    const params = use(props.params)
    const [post, setPost] = useState<ArticleDetail>()
    const requestEditPost = async (post: RequestPostDataType) =>
        await fetch(`/api/article/${params.postId}`, {
            method: 'PUT',
            body: JSON.stringify(post),
        }).then(async (res) => (await res.json()) as { postId: number })

    useEffect(() => {
        fetch(`/api/article/${params.postId}`)
            .then((res) => res.json())
            .then((data) => setPost(data))
    }, [params.postId])

    return <Editor submitFn={requestEditPost} post={post} />
}

export default EditPage
