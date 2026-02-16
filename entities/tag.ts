import { serverFetchData } from '@lib/api/client'
import 'server-only'

export type Tag = {
    tagId: number
    tag: string
}

export const getTagList = async () => {
    const data = await serverFetchData<{ tags: Tag[] }>('/api/blog/tags', {
        revalidate: 60 * 60 * 24 * 30,
        tags: ['tagList'],
    })
    return data.tags
}
