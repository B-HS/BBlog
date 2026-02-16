import { serverFetchData } from '@lib/api/client'
import 'server-only'

export type UserWithStats = {
    id: string
    name: string | null
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    role: string | null
    banned: boolean | null
    banReason: string | null
    banExpires: Date | null
    postsCount: number
    commentsCount: number
}

export type PostWithCategory = {
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
}

export type CommentWithPost = {
    commentId: number
    postId: number
    postTitle: string
    userId: string
    userName: string
    userEmail: string
    userImage: string | null
    comment: string
    updatedAt: Date
    createdAt: Date
    isHide: boolean
}

export const getAllUsers = async () => {
    const data = await serverFetchData<{ users: UserWithStats[] }>('/api/blog/admin/users', {
        cache: 'no-store',
    })
    return data.users
}

export const getAllPosts = async () => {
    const data = await serverFetchData<{ posts: PostWithCategory[] }>('/api/blog/admin/posts', {
        cache: 'no-store',
    })
    return data.posts
}

export const getAllComments = async () => {
    const data = await serverFetchData<{ comments: CommentWithPost[] }>('/api/blog/admin/comments', {
        cache: 'no-store',
    })
    return data.comments
}
