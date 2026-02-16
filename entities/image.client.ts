'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Image } from './image'
import { QUERY_KEY } from '@lib/constants'
import { clientFetch } from '@lib/api/client-fetch'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hub.gumyo.net'

export const useGetImageList = () => {
    return useQuery<Image[]>({
        queryKey: [QUERY_KEY.IMAGE.LIST],
        queryFn: async () => {
            const data = await clientFetch<{ images: Image[] }>('/api/blog/images')
            return data.images
        },
    })
}

export const useUploadImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append('file', file)
            const res = await fetch(`${API_URL}/api/blog/images/upload`, {
                method: 'POST',
                body: formData,
                credentials: 'include',
            })
            if (!res.ok) throw new Error('Failed to upload image')
            return res
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.IMAGE.LIST] })
        },
    })
}
