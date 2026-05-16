'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Tag } from './tag'
import { QUERY_KEY } from '@lib/constants'
import { clientFetch } from '@lib/api/client-fetch'

export const useGetTagList = () => {
    return useQuery<Tag[]>({
        queryKey: [QUERY_KEY.TAG.LIST],
        queryFn: async () => {
            const data = await clientFetch<{ tags: Tag[] }>('/api/blog/tags')
            return data.tags
        },
    })
}

export const useCreateTag = () => {
    const queryClient = useQueryClient()

    return useMutation<Tag, Error, string>({
        mutationFn: async (tag: string) => {
            return clientFetch<Tag>('/api/blog/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tag }),
            })
        },
        onSuccess: () => {
            fetch('/api/revalidate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tags: [QUERY_KEY.TAG.LIST] }),
            })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.TAG.LIST] })
        },
    })
}
