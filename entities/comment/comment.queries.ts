import { queryOptions } from '@tanstack/react-query'
import { queryKeys } from '@shared/constant/query-key'
import { CommentProps } from './comment.types'

export const commentQueries = {
    all: (page: number) =>
        queryOptions({
            queryKey: queryKeys.comment.all,
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const data = await fetch(`${baseUrl}/api/comment?page=${page}`, {
                    next: { tags: ['comments'] },
                })
                if (data.status !== 200) return { comments: [], page: 1, limit: 10, total: 0, totalPage: 1 }
                const commentData = (await data.json()) as { comments: CommentProps[]; page: number; limit: number; total: number; totalPage: number }
                return commentData
            },
        }),
    byPost: (post: number) =>
        queryOptions({
            queryKey: queryKeys.comment.byPost(post),
            queryFn: async () => {
                const baseUrl = process.env.SITE_URL || ''
                const data = await fetch(`${baseUrl}/api/comment/${post}`, {
                    next: { tags: ['comments'] },
                })
                if (data.status !== 200) return []
                const commentData = (await data.json()) as { comments: CommentProps[] }
                return commentData.comments
            },
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
        }),
}
