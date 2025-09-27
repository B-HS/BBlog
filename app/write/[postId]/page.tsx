'use client'

import { articleQueries } from '@entities/article'
import { Editor, RequestPostDataType } from '@widgets/article/editor'
import { useQuery } from '@tanstack/react-query'
import { use } from 'react'

const EditPage = (props: { params: Promise<{ postId: number }> }) => {
    const params = use(props.params)

    const { data: post } = useQuery(articleQueries.detail(params.postId))

    const requestEditPost = async (post: RequestPostDataType) => {
        const result = await fetch(`/api/article/${params.postId}`, {
            method: 'PUT',
            body: JSON.stringify(post),
        }).then(async (res) => (await res.json()) as { postId: number })

        await Promise.all([fetch('/api/revalidate/articles', { method: 'POST' }), fetch('/api/revalidate/article', { method: 'POST' })])

        return result
    }

    return <Editor submitFn={requestEditPost} post={post} />
}

export default EditPage
