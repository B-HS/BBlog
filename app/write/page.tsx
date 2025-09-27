'use client'

import { Editor, RequestPostDataType } from '@widgets/article/editor'

const WritePage = () => {
    const requestAddPost = async (post: RequestPostDataType) => {
        const result = await fetch('/api/article', {
            method: 'POST',
            body: JSON.stringify(post),
        }).then(async (res) => (await res.json()) as { postId: number })

        await Promise.all([fetch('/api/revalidate/articles', { method: 'POST' }), fetch('/api/revalidate/article', { method: 'POST' })])

        return result
    }

    const requestSavePostTemporarily = async (post: RequestPostDataType) =>
        await fetch('/api/temporal-post', {
            method: 'POST',
            body: JSON.stringify(post),
        }).then(async (res) => (await res.json()) as { postId: number })
    return <Editor submitFn={requestAddPost} tempSaveFn={requestSavePostTemporarily} />
}

export default WritePage
