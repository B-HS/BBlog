'use client'

import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@lib/constants'
import { clientFetch } from '@lib/api/client-fetch'
import { toast } from 'sonner'

export const commentListQueryOptions = (postId: number) =>
    queryOptions({
        queryKey: QUERY_KEY.COMMENT.LIST(String(postId)),
        queryFn: async () => {
            const data = await clientFetch<{
                comments: {
                    commentId: number
                    postId: number
                    userId: string
                    comment: string | undefined
                    updatedAt: Date
                    createdAt: Date
                    isHide: boolean
                    userName: string
                    userImage: string | null
                }[]
            }>(`/api/blog/comments?postId=${postId}`)
            return data.comments
        },
    })

export const useGetCommentList = (postId: number, enabled = false) => useQuery({ ...commentListQueryOptions(postId), enabled })

const revalidateArticlePath = (postId: number) =>
    fetch('/api/revalidate/path', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ path: `/article/${postId}` }),
    })

export const useCreateComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { postId: number; comment: string; isHide?: boolean }) => {
            return clientFetch('/api/blog/comments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
        },
        onSuccess: (_, variables) => {
            revalidateArticlePath(variables.postId)
            toast.success('댓글이 작성되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.COMMENT.LIST(String(variables.postId)) })
        },
        onError: () => {
            toast.error('댓글 작성에 실패했습니다')
        },
    })
}

export const useUpdateComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { commentId: number; postId: number; comment: string; isHide?: boolean }) => {
            return clientFetch(`/api/blog/comments/${data.commentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ comment: data.comment, isHide: data.isHide }),
            })
        },
        onSuccess: (_, variables) => {
            revalidateArticlePath(variables.postId)
            toast.success('댓글이 수정되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.COMMENT.LIST(String(variables.postId)) })
        },
        onError: () => {
            toast.error('댓글 수정에 실패했습니다')
        },
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { commentId: number; postId: number }) => {
            return clientFetch(`/api/blog/comments/${data.commentId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: (_, variables) => {
            revalidateArticlePath(variables.postId)
            toast.success('댓글이 삭제되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.COMMENT.LIST(String(variables.postId)) })
        },
        onError: () => {
            toast.error('댓글 삭제에 실패했습니다')
        },
    })
}
