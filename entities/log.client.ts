import { QUERY_KEY } from '@lib/constants'
import { useInfiniteQuery } from '@tanstack/react-query'
import { GetLogMessagesByUserIdResponse } from './log'

export const useInfiniteGetLogMessagesByUserId = (userId: string, size: number = 10) => {
    return useInfiniteQuery({
        queryKey: [...QUERY_KEY.LOG.MESSAGES(userId), 'infinite'],
        queryFn: async ({ pageParam }) => {
            const response = await fetch(`/api/log/messages/user/${userId}?page=${pageParam}&size=${size}`)
            return response.json() as Promise<GetLogMessagesByUserIdResponse>
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage: GetLogMessagesByUserIdResponse) => lastPage.next,
    })
}
