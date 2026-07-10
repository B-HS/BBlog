'use client'

import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Category } from './category'
import { CACHE_TAG, QUERY_KEY } from '@lib/constants'
import { clientFetch } from '@lib/api/client-fetch'

export const categoryListQueryOptions = () =>
    queryOptions({
        queryKey: QUERY_KEY.CATEGORY.LIST,
        queryFn: async () => {
            const data = await clientFetch<{ categories: Category[] }>('/api/blog/categories')
            return data.categories
        },
    })

export const useGetCategoryList = () => useQuery(categoryListQueryOptions())

export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    return useMutation<Category, Error, string>({
        mutationFn: async (category: string) => {
            return clientFetch<Category>('/api/blog/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ category }),
            })
        },
        onSuccess: () => {
            fetch('/api/revalidate', {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tags: [CACHE_TAG.CATEGORY_LIST] }),
            })
            queryClient.invalidateQueries({ queryKey: QUERY_KEY.CATEGORY.LIST })
        },
    })
}
