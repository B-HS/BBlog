'use client'

import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { QUERY_KEY } from '@lib/constants'
import type { PostDetail } from './post'

export const useGetPost = (id: string) => {
    return useQuery<PostDetail>({
        queryKey: QUERY_KEY.POST.GET(id),
        queryFn: async () => {
            const response = await fetch(`/api/post/${id}`)
            if (!response.ok) throw new Error('Failed to fetch post')
            return response.json()
        },
    })
}

export const useCreatePost = () => {
    const router = useRouter()
    return useMutation({
        mutationFn: async (data: { title: string; description: string; categoryId: number; tagIds: number[]; isPublished: boolean }) => {
            const response = await fetch('/api/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to create post')
            return response.json()
        },
        onSuccess: () => {
            toast.success('포스트가 생성되었습니다')
            router.push('/article')
        },
        onError: () => {
            toast.error('포스트 생성에 실패했습니다')
        },
    })
}

export const useUpdatePost = (id: string) => {
    const router = useRouter()
    return useMutation({
        mutationFn: async (data: { title: string; description: string; categoryId: number; tagIds: number[]; isPublished: boolean }) => {
            const response = await fetch(`/api/post/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            })
            if (!response.ok) throw new Error('Failed to update post')
            return response.json()
        },
        onSuccess: () => {
            toast.success('포스트가 수정되었습니다')
            router.push(`/article/${id}`)
        },
        onError: () => {
            toast.error('포스트 수정에 실패했습니다')
        },
    })
}
