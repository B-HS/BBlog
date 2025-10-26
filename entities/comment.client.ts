'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY } from '@lib/constants'
import { toast } from 'sonner'

export const useGetCommentList = (postId: number, enabled = false) => {
    return useQuery({
        queryKey: QUERY_KEY.COMMENT.LIST(String(postId)),
        queryFn: async () => {
            const response = await fetch(`/api/comment?postId=${postId}`)
            if (!response.ok) throw new Error('Failed to fetch comments')
            return response.json()
        },
        enabled,
    })
}

export const useCreateComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { postId: number; comment: string; isHide?: boolean }) => {
            const response = await fetch('/api/comment', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create comment')
            return response.json()
        },
        onSuccess: (_, variables) => {
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
            const response = await fetch('/api/comment', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commentId: data.commentId, comment: data.comment, isHide: data.isHide }),
            })
            if (!response.ok) throw new Error('Failed to update comment')
            return response.json()
        },
        onSuccess: (_, variables) => {
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
            const response = await fetch('/api/comment', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ commentId: data.commentId }),
            })
            if (!response.ok) throw new Error('Failed to delete comment')
            return response.json()
        },
        onSuccess: (_, variables) => {
            toast.success('댓글이 삭제되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.COMMENT.LIST(String(variables.postId)) })
        },
        onError: () => {
            toast.error('댓글 삭제에 실패했습니다')
        },
    })
}
