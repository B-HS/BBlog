import { PaginationResponse } from '../common'

export type Post = {
    postId: number
    categoryId: string
    title: string
    description: string
    updatedAt: Date
    createdAt: Date
    views: number
    isHide: boolean
    isNotice: boolean
    isComment: boolean
    tags: { id: string; name: string }[]
    categories: { id: string; name: string }[]
}

export interface GetPostsRequest {
    tagId?: string
    categoryId?: string
    page?: number
    limit?: number
    perPage?: number
    sort?: string
    order?: 'asc' | 'desc'
    search?: string
    isHide?: boolean
    isNotice?: boolean
    isComment?: boolean
}

export type PaginatedPostListResponse = PaginationResponse<Post>
