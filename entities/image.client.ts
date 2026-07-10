'use client'

import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Image } from './image'
import { QUERY_KEY } from '@lib/constants'
import { clientFetch } from '@lib/api/client-fetch'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hub.gumyo.net'

type PrepareResponse = {
    success: true
    data: {
        assetId: string
        s3Key: string
        uploadToken: string
        uploadUrl: string
        expiresAt: number
    }
}

type UploadServerResponse = {
    success: true
    url: string
}

export const imageListQueryOptions = () =>
    queryOptions({
        queryKey: QUERY_KEY.IMAGE.LIST,
        queryFn: async () => {
            const data = await clientFetch<{ images: Image[] }>('/api/blog/images')
            return data.images
        },
    })

export const useGetImageList = () => useQuery(imageListQueryOptions())

export const useUploadImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (file: File) => {
            const prepRes = await fetch(`${API_URL}/api/blog/images/prepare`, {
                method: 'POST',
                credentials: 'include',
            })
            if (!prepRes.ok) throw new Error('Failed to prepare image upload')
            const prep = (await prepRes.json()) as PrepareResponse

            const formData = new FormData()
            formData.append('file', file)
            formData.append('assetId', prep.data.assetId)
            formData.append('s3Key', prep.data.s3Key)
            formData.append('uploadToken', prep.data.uploadToken)

            const upRes = await fetch(prep.data.uploadUrl, {
                method: 'POST',
                body: formData,
            })
            if (!upRes.ok) throw new Error('Failed to upload image')
            const json = (await upRes.json()) as UploadServerResponse

            return { id: prep.data.assetId, url: json.url }
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.IMAGE.LIST })
        },
    })
}

export const useDeleteImage = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: async (id: string) => {
            const res = await fetch(`${API_URL}/api/blog/images/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            if (!res.ok) throw new Error('Failed to delete image')
            return id
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.IMAGE.LIST })
        },
    })
}
