'use client'

import { authClient } from '@lib/auth/auth-client'
import { QUERY_KEY } from '@lib/constants'
import { queryOptions, useQuery } from '@tanstack/react-query'

const SESSION_STALE_TIME_MS = 1000 * 60 * 5

export const sessionQueryOptions = () =>
    queryOptions({
        queryKey: QUERY_KEY.AUTH.SESSION,
        queryFn: async () => {
            const session = await authClient.getSession()
            return session.data
        },
        staleTime: SESSION_STALE_TIME_MS,
        refetchOnWindowFocus: true,
    })

export const useSession = () => useQuery(sessionQueryOptions())
