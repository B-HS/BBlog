import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { queryKeys } from '@shared/constant/query-key'
import { ResponseArticleList } from './article.types'

export const articleQueries = {
    list: (filters: { categoryId?: number; keywords?: string } = {}) =>
        infiniteQueryOptions({
            queryKey: queryKeys.article.list(filters),
            queryFn: async ({ pageParam = 1 }) => {
                const baseUrl = process.env.SITE_URL || ''
                const query = filters.categoryId ? `categoryId=${filters.categoryId}&page=${pageParam}` : `page=${pageParam}`
                const withKeyword = filters.keywords ? `&keywords=${filters.keywords}` : ''
                const res = await fetch(`${baseUrl}/api/article?${query}${withKeyword}`)
                const result = (await res.json()) as ResponseArticleList
                return {
                    posts: result.posts,
                    nextPage: result.posts.length > 0 ? pageParam + 1 : undefined,
                }
            },
            getNextPageParam: (lastPage) => lastPage.nextPage ?? null,
            initialPageParam: 1,
        }),

    detail: (id: number | string) =>
        queryOptions({
            queryKey: queryKeys.article.detail(id),
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const res = await fetch(`${baseUrl}/api/article/${id}`)
                if (!res.ok) throw new Error('Failed to fetch article')
                return res.json()
            },
        }),

    byTag: (tag: string) =>
        queryOptions({
            queryKey: queryKeys.article.byTag(tag),
            queryFn: async () => {
                const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/tag/${tag}`)
                return res.json() as Promise<ResponseArticleList>
            },
        }),
}
