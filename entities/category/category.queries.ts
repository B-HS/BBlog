import { queryOptions } from '@tanstack/react-query'
import { queryKeys } from '@shared/constant/query-key'
import { Category } from './category.types'

export const categoryQueries = {
    all: () =>
        queryOptions({
            queryKey: queryKeys.category.all,
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const res = await fetch(`${baseUrl}/api/category`)
                const { categories } = (await res.json()) as { categories: Category[] }
                return categories
            },
        }),
}
