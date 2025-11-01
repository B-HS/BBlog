'use client'

import { authClient } from '@lib/auth/auth-client'
import { QUERY_KEY } from '@lib/constants'
import { useQuery } from '@tanstack/react-query'

export const useSession = () => {
    return useQuery({
        queryKey: QUERY_KEY.AUTH.SESSION,
        queryFn: async () => {
            const session = await authClient.getSession()
            return session.data
        },
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: true,
    })
}
