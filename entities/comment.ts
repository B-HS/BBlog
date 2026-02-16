import { serverFetchData } from '@lib/api/client'
import 'server-only'

export type CommentWithUser = {
    commentId: number
    postId: number
    userId: string
    comment: string | undefined
    updatedAt: Date
    createdAt: Date
    isHide: boolean
    userName: string
    userImage: string | null
}

export const getCommentList = async (postId: number) => {
    const data = await serverFetchData<{ comments: CommentWithUser[] }>(`/api/blog/comments?postId=${postId}`, {
        cache: 'no-store',
    })
    return data.comments
}
