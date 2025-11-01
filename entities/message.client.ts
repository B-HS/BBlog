'use client'

import { QUERY_KEY } from '@lib/constants'
import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { GetMessagesByUserIdResponse } from './message'

export const useInfiniteGetMessagesByUserId = (userId: string, size: number = 10) => {
    return useInfiniteQuery({
        queryKey: [...QUERY_KEY.LOG.MESSAGES(userId), 'infinite'],
        queryFn: async ({ pageParam }) => {
            const response = await fetch(`/api/log/messages/user/${userId}?page=${pageParam}&size=${size}`)
            return response.json() as Promise<GetMessagesByUserIdResponse>
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetMessagesByUserIdResponse) => lastPage.next,
    })
}

export const useCreateMessage = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (data: { body: string; imageIds?: string[]; replyToId?: string; retweetOfId?: string }) => {
            const response = await fetch('/api/log/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create message')
            return response.json()
        },
        onSuccess: () => {
            toast.success('메시지가 생성되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.LOG.MESSAGES(userId) })
        },
        onError: () => {
            toast.error('메시지 생성에 실패했습니다')
        },
    })
}

export const useDeleteMessage = (userId: string) => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (messageId: string) => {
            const response = await fetch(`/api/log/messages/${messageId}`, {
                method: 'DELETE',
            })
            if (!response.ok) throw new Error('Failed to delete message')
            return response.json()
        },
        onSuccess: () => {
            toast.success('메시지가 삭제되었습니다')
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.LOG.MESSAGES(userId) })
        },
        onError: () => {
            toast.error('메시지 삭제에 실패했습니다')
        },
    })
}
