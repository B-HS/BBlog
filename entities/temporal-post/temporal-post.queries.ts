import { queryOptions } from '@tanstack/react-query'
import { queryKeys } from '@shared/constant/query-key'
import { temporalPost } from 'drizzle/schema'

export const temporalPostQueries = {
    all: () =>
        queryOptions({
            queryKey: queryKeys.temporalPost.all,
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const response = await fetch(`${baseUrl}/api/temporal-post`, { method: 'GET', cache: 'no-cache' }).then((res) => res.json())
                return (response || []) as (typeof temporalPost.$inferSelect)[]
            },
            gcTime: 0,
        }),
}
