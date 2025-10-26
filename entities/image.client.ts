'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Image } from './image'
import { QUERY_KEY } from '@lib/constants'

export const useGetImageList = () => {
    return useQuery<Image[]>({
        queryKey: [QUERY_KEY.IMAGE.LIST],
        queryFn: async () => {
            const response = await fetch('/api/image')
            if (!response.ok) throw new Error('Failed to fetch images')
            return response.json()
        },
    })
}

export const useUploadImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (file: File) => {
            const formData = new FormData()
            formData.append('image', file)
            return await fetch('/api/image/upload', {
                method: 'POST',
                body: formData,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.IMAGE.LIST] })
        },
    })
}
