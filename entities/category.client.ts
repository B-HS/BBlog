'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Category } from './category'
import { QUERY_KEY } from '@lib/constants'

export const useGetCategoryList = () => {
    return useQuery<Category[]>({
        queryKey: [QUERY_KEY.CATEGORY.LIST],
        queryFn: async () => {
            const response = await fetch('/api/category')
            if (!response.ok) throw new Error('Failed to fetch categories')
            return response.json()
        },
    })
}

export const useCreateCategory = () => {
    const queryClient = useQueryClient()

    return useMutation<Category, Error, string>({
        mutationFn: async (category: string) => {
            const response = await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ category }),
            })
            if (!response.ok) throw new Error('Failed to create category')
            return response.json()
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY.CATEGORY.LIST] })
        },
    })
}
