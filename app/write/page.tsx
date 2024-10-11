'use client'

import { Editor, RequestPostDataType } from '@widgets/article/editor'

const WritePage = () => {
    const requestAddPost = async (post: RequestPostDataType) =>
        await fetch('/api/article', {
            method: 'POST',
            body: JSON.stringify(post),
        }).then(async (res) => (await res.json()) as { postId: number })
    return <Editor submitFn={requestAddPost} />
}

export default WritePage
