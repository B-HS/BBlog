'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Category } from './category'
import { QUERY_KEY } from '@lib/constants'
import { clientFetch } from '@lib/api/client-fetch'

export const useGetCategoryList = () => {
    return useQuery<Category[]>({
        queryKey: [QUERY_KEY.CATEGORY.LIST],
        queryFn: async () => {
            const data = await clientFetch<{ categories: Category[] }>('/api/blog/categories')
            return data.categories
        },
    })
}

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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tags: [QUERY_KEY.CATEGORY.LIST] }),
            })
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORY.LIST] })
        },
    })
}
