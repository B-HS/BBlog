import { queryOptions } from '@tanstack/react-query'
import { queryKeys } from '@shared/constant/query-key'
import { CommentProps } from './comment.types'

export const commentQueries = {
    byPost: (post: number) =>
        queryOptions({
            queryKey: queryKeys.comment.byPost(post),
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const data = await fetch(`${baseUrl}/api/comment/${post}`)
                if (data.status !== 200) return []
                const commentData = (await data.json()) as { comments: CommentProps[] }
                return commentData.comments
            },
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        }),
}
