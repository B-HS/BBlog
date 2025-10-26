'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Tag } from './tag'
import { QUERY_KEY } from '@lib/constants'

export const useGetTagList = () => {
    return useQuery<Tag[]>({
        queryKey: [QUERY_KEY.TAG.LIST],
        queryFn: async () => {
            const response = await fetch('/api/tag')
            if (!response.ok) throw new Error('Failed to fetch tags')
            return response.json()
        },
    })
}

export const useCreateTag = () => {
    const queryClient = useQueryClient()

    return useMutation<Tag, Error, string>({
        mutationFn: async (tag: string) => {
            const response = await fetch('/api/tag', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ tag }),
            })
            if (!response.ok) throw new Error('Failed to create tag')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TAG.LIST] })
        },
    })
}
