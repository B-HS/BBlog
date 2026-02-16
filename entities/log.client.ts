import { QUERY_KEY } from '@lib/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { clientFetch } from '@lib/api/client-fetch'
import { GetLogMessagesByUserIdResponse } from './log'

export const useInfiniteGetLogMessagesByUserId = (userId: string, size: number = 10) => {
    return useInfiniteQuery({
        queryKey: [...QUERY_KEY.LOG.MESSAGES(userId), 'infinite'],
        queryFn: async ({ pageParam }) => {
            return clientFetch<GetLogMessagesByUserIdResponse>(`/api/blog/messages/user/${userId}?page=${pageParam}&size=${size}`)
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetLogMessagesByUserIdResponse) => lastPage.next,
    })
}
