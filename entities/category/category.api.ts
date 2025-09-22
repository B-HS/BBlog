import { QUERY_KEY } from '@/shared/utils/query-key'
import type { CategoriesListResponse, Category, GetCategoriesRequest } from './category.types'

const BASE_URL = `${process.env.BASE_URL || ''}/api/category`

export const fetchCategories = async (params?: GetCategoriesRequest) => {
    const searchParams = new URLSearchParams()

    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                searchParams.append(key, String(value))
            }
        })
    }

    const url = searchParams.toString() ? `${BASE_URL}?${searchParams.toString()}` : BASE_URL

    const response = await fetch(url, {
        next: {
            tags: QUERY_KEY.CATEGORY.LIST(params) as string[],
            revalidate: 3600,
        },
    })

    if (!response.ok) {
        throw new Error('Failed to fetch categories')
    }

    return response.json() as Promise<CategoriesListResponse>
}

export const fetchCategoryById = async (categoryId: string) => {
    const response = await fetch(`${BASE_URL}/${categoryId}`)

    if (!response.ok) {
        throw new Error('Failed to fetch category')
    }

    return response.json() as Promise<Category>
}
