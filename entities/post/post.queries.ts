import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/shared/utils/query-key'
import { fetchPosts, fetchPostById, fetchPostContent } from './post.api'
import type { GetPostsRequest } from './post.types'

export const useGetPosts = (params?: GetPostsRequest) => {
    return useQuery({
        queryKey: QUERY_KEY.POST.LIST(params),
        queryFn: () => fetchPosts(params),
    })
}

export const useGetPostById = (postId: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEY.POST.DETAIL(postId),
        queryFn: () => fetchPostById(postId),
        enabled: !!postId && enabled,
    })
}

export const useGetPostContent = (postId: string, enabled = true) => {
    return useQuery({
        queryKey: QUERY_KEY.POST.CONTENT(postId),
        queryFn: () => fetchPostContent(postId),
        enabled: !!postId && enabled,
    })
}
