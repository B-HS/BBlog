import { queryOptions } from '@tanstack/react-query'
import { queryKeys } from '@shared/constant/query-key'
import { ResponseArticleList } from '@entities/article'
import { Category } from '@entities/category'

export const adminQueries = {
    categories: () =>
        queryOptions({
            queryKey: queryKeys.category.all,
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const res = await fetch(`${baseUrl}/api/category`)
                const { categories } = (await res.json()) as { categories: Category[] }
                return categories
            },
        }),

    articles: (page: number, limit: number = 10) =>
        queryOptions({
            queryKey: queryKeys.admin.articles(page),
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const res = await fetch(`${baseUrl}/api/article?all=false&limit=${limit}&page=${page}`)
                const result = (await res.json()) as ResponseArticleList
                return result
            },
        }),

    visitor: (periodState: { period: string; gap: number }, dates: { startDate: string; endDate: string; type: string }) =>
        queryOptions({
            queryKey: queryKeys.admin.visitor(periodState),
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const searchParam = new URLSearchParams()
                searchParam.append('startDate', dates.startDate)
                searchParam.append('endDate', dates.endDate)
                searchParam.append('type', dates.type)
                return await fetch(`${baseUrl}/api/admin/chart?` + searchParam.toString()).then((res) => res.json())
            },
        }),

    hotArticle: (periodState: { period: string; gap: number }, dates: { startDate: string; endDate: string; type: string }) =>
        queryOptions({
            queryKey: queryKeys.admin.hotArticle(periodState),
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const searchParam = new URLSearchParams()
                searchParam.append('startDate', dates.startDate)
                searchParam.append('endDate', dates.endDate)
                searchParam.append('type', dates.type)
                return await fetch(`${baseUrl}/api/admin/hot?` + searchParam.toString()).then((res) => res.json())
            },
        }),
}
