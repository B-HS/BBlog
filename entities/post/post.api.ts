import { QUERY_KEY } from '@/shared/utils/query-key'
import type { GetPostsRequest, PaginatedPostListResponse, Post } from './post.types'

const BASE_URL = `${process.env.BASE_URL || ''}/api/post`

export const fetchPosts = async (params?: GetPostsRequest) => {
    const searchParams = new URLSearchParams()

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value))
            }
        })
    }

    const url = searchParams.toString() ? `${BASE_URL}?${searchParams.toString()}` : BASE_URL

    const response = await fetch(url, {
        next: {
            tags: QUERY_KEY.POST.LIST(params) as string[],
            revalidate: 3600
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch posts')
    }

    return response.json() as Promise<PaginatedPostListResponse>
}

export const fetchPostById = async (postId: string) => {
    const response = await fetch(`${BASE_URL}/${postId}`)

    if (!response.ok) {
        throw new Error('Failed to fetch post')
    }

    return response.json() as Promise<Post>
}

export const fetchPostContent = async (postId: string) => {
    const response = await fetch(`${BASE_URL}/${postId}/content`)

    if (!response.ok) {
        throw new Error('Failed to fetch post content')
    }

    return response.json()
}
