'use client'

import { QUERY_KEY } from '@/shared/utils/query-key'
import { useQuery } from '@tanstack/react-query'
import { getCategories, getCategoryById } from './category.services'
import { GetCategoriesRequest } from './category.types'

export const useCategoriesQuery = (params?: GetCategoriesRequest) => {
    return useQuery({
        queryKey: QUERY_KEY.CATEGORY.LIST(params),
        queryFn: () => getCategories(params),
    })
}

export const useCategoryByIdQuery = (categoryId: string) => {
    return useQuery({
        queryKey: QUERY_KEY.CATEGORY.DETAIL(categoryId),
        queryFn: () => getCategoryById(categoryId),
        enabled: !!categoryId,
    })
}