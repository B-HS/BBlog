'use client'

import { QUERY_KEY } from '@lib/constants'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { clientFetch } from '@lib/api/client-fetch'
import type { CommentWithPost, PostWithCategory, UserWithStats } from './admin'

export const useGetAllUsers = () => {
    return useQuery<UserWithStats[]>({
        queryKey: QUERY_KEY.ADMIN.USERS,
        queryFn: async () => {
            const data = await clientFetch<{ users: UserWithStats[] }>('/api/blog/admin/users')
            return data.users
        },
    })
}

export const useGetAllPosts = () => {
    return useQuery<PostWithCategory[]>({
        queryKey: QUERY_KEY.ADMIN.POSTS,
        queryFn: async () => {
            const data = await clientFetch<{ posts: PostWithCategory[] }>('/api/blog/admin/posts')
            return data.posts
        },
    })
}

export const useGetAllComments = () => {
    return useQuery<CommentWithPost[]>({
        queryKey: QUERY_KEY.ADMIN.COMMENTS,
        queryFn: async () => {
            const data = await clientFetch<{ comments: CommentWithPost[] }>('/api/blog/admin/comments')
            return data.comments
        },
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (userId: string) => {
            return clientFetch(`/api/blog/admin/users/${userId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: () => {
            toast.success('사용자가 삭제되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.USERS })
        },
        onError: () => {
            toast.error('사용자 삭제에 실패했습니다')
        },
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (postId: number) => {
            return clientFetch(`/api/blog/admin/posts/${postId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: () => {
            toast.success('게시글이 삭제되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.POSTS })
        },
        onError: () => {
            toast.error('게시글 삭제에 실패했습니다')
        },
    })
}

export const useUpdatePostHide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ postId, isHide }: { postId: number; isHide: boolean }) => {
            return clientFetch(`/api/blog/admin/posts/${postId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isHide }),
            })
        },
        onSuccess: (_, variables) => {
            toast.success(variables.isHide ? '게시글을 숨겼습니다' : '게시글을 공개했습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.POSTS })
        },
        onError: () => {
            toast.error('게시글 상태 변경에 실패했습니다')
        },
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (commentId: number) => {
            return clientFetch(`/api/blog/admin/comments/${commentId}`, {
                method: 'DELETE',
            })
        },
        onSuccess: () => {
            toast.success('댓글이 삭제되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.COMMENTS })
        },
        onError: () => {
            toast.error('댓글 삭제에 실패했습니다')
        },
    })
}

export const useUpdateCommentHide = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async ({ commentId, isHide }: { commentId: number; isHide: boolean }) => {
            return clientFetch(`/api/blog/admin/comments/${commentId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isHide }),
            })
        },
        onSuccess: (_, variables) => {
            toast.success(variables.isHide ? '댓글을 숨겼습니다' : '댓글을 공개했습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.ADMIN.COMMENTS })
        },
        onError: () => {
            toast.error('댓글 상태 변경에 실패했습니다')
        },
    })
}
