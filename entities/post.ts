import { serverFetchData, serverFetchPaginated } from '@lib/api/client'
import 'server-only'

export type PostDetail = {
    postId: number
    categoryId: number
    categoryName: string | null
    title: string
    description: string
    updatedAt: Date
    createdAt: Date
    views: number
    isPublished: boolean
    isHide: boolean
    isNotice: boolean
    isComment: boolean
    tags: { tagId: number; tag: string }[]
}

export type GetPostListParams = {
    offset?: number
    limit?: number
    keyword?: string
    categoryId?: number
    tagId?: number
    isPublished?: boolean
    isHide?: boolean
    isNotice?: boolean
}

export const getAllPosts = async () => {
    const { data } = await serverFetchPaginated<PostDetail>('/api/blog/posts?limit=100&isPublished=true&isHide=false', {
        revalidate: 60 * 60 * 24,
    })
    return data.map((p) => ({ postId: p.postId, updatedAt: p.updatedAt }))
}

export const getPostList = async ({
    offset = 0,
    limit = 12,
    keyword,
    categoryId,
    tagId,
    isPublished = true,
    isHide = false,
    isNotice = false,
}: GetPostListParams) => {
    const page = Math.floor(offset / limit) + 1
    const params = new URLSearchParams()
    params.set('page', String(page))
    params.set('limit', String(limit))
    if (keyword) params.set('keyword', keyword)
    if (categoryId) params.set('categoryId', String(categoryId))
    if (tagId) params.set('tagId', String(tagId))
    params.set('isPublished', String(isPublished))
    params.set('isHide', String(isHide))
    params.set('isNotice', String(isNotice))

    const { data, pagination } = await serverFetchPaginated<PostDetail>(`/api/blog/posts?${params.toString()}`, {
        revalidate: 60,
    })

    return { data, total: pagination.total }
}

export const getPost = async (id: string | number) => {
    const data = await serverFetchData<{ post: PostDetail }>(`/api/blog/posts/${id}`, {
        revalidate: 2592000,
    })
    return data.post ? [data.post] : []
}
