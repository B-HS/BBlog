import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query'
import { queryKeys } from '@shared/constant/query-key'
import { MisskeyPost, MisskeyUserInfo } from './misskey.types'

export const misskeyQueries = {
    userInfo: () =>
        queryOptions({
            queryKey: ['misskey', 'userInfo'] as const,
            queryFn: async () => {
                const instanceUrl = process.env.MISSKEY_INSTANCE_URL
                const userId = process.env.MISSKEY_USER_ID || process.env.NEXT_PUBLIC_MISSKEY_USER_ID
                const siteName = process.env.SITE_NAME || process.env.NEXT_PUBLIC_SITE_NAME

                const misskeyUserInfo: MisskeyUserInfo = await fetch(`${instanceUrl}/api/users/show`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId,
                    }),
                    cache: 'no-cache',
                }).then(async (res) => await res.json())

                return {
                    name: siteName || misskeyUserInfo.name,
                    anchor: misskeyUserInfo.username,
                    description: misskeyUserInfo.description,
                    avatarUrl: misskeyUserInfo.avatarUrl,
                    bannerUrl: misskeyUserInfo.bannerUrl,
                    location: misskeyUserInfo.location,
                    createdAt: misskeyUserInfo.createdAt,
                    updatedAt: misskeyUserInfo.updatedAt,
                }
            },
            enabled: !!process.env.MISSKEY_INSTANCE_URL,
        }),

    userNotes: (userId: string) =>
        infiniteQueryOptions({
            queryKey: queryKeys.misskey.posts,
            queryFn: async ({ pageParam }: { pageParam?: string }) => {
                const params = {
                    userId,
                    ...(pageParam && { untilId: pageParam }),
                    fileType: ['image/jpeg', 'image/webp', 'image/avif', 'image/png', 'image/gif', 'image/apng', 'image/vnd.mozilla.apng'],
                    limit: 10,
                }
                const data = await fetch('https://mi.gumyo.net/api/users/notes', {
                    method: 'POST',
                    body: JSON.stringify(params),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(async (res) => await res.json())

                return data as MisskeyPost[]
            },
            getNextPageParam: (lastPage) => {
                const lastPost = lastPage?.[lastPage.length - 1]
                return lastPost?.id
            },
            initialPageParam: undefined,
        }),
}
