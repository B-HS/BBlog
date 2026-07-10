'use client'

import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Tag } from './tag'
import { CACHE_TAG, QUERY_KEY } from '@lib/constants'
import { clientFetch } from '@lib/api/client-fetch'

export const tagListQueryOptions = () =>
    queryOptions({
        queryKey: QUERY_KEY.TAG.LIST,
        queryFn: async () => {
            const data = await clientFetch<{ tags: Tag[] }>('/api/blog/tags')
            return data.tags
        },
    })

export const useGetTagList = () => useQuery(tagListQueryOptions())

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
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tags: [CACHE_TAG.TAG_LIST] }),
            })
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.TAG.LIST })
        },
    })
}
