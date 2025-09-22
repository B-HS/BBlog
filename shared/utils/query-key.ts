import type { GetCategoriesRequest } from '@/entities/category/category.types'
import type { GetPostsRequest } from '@/entities/post/post.types'

export const QUERY_KEY = {
    POST: {
        root: 'post',
        LIST: (params?: GetPostsRequest) => {
            const keys = ['post-list']
            if (params) {
                if (params.page !== undefined) keys.push(`page:${params.page}`)
                if (params.limit !== undefined) keys.push(`limit:${params.limit}`)
                if (params.perPage !== undefined) keys.push(`perPage:${params.perPage}`)
                if (params.sort !== undefined) keys.push(`sort:${params.sort}`)
                if (params.order !== undefined) keys.push(`order:${params.order}`)
                if (params.search !== undefined) keys.push(`search:${params.search}`)
                if (params.categoryId !== undefined) keys.push(`categoryId:${params.categoryId}`)
                if (params.tagId !== undefined) keys.push(`tagId:${params.tagId}`)
                if (params.isHide !== undefined) keys.push(`isHide:${params.isHide}`)
                if (params.isNotice !== undefined) keys.push(`isNotice:${params.isNotice}`)
                if (params.isComment !== undefined) keys.push(`isComment:${params.isComment}`)
            }
            return keys
        },
        DETAIL: (postId: number | string) => ['post-detail', String(postId)],
        CONTENT: (postId: string) => ['post-content', postId],
    },
    CATEGORY: {
        root: 'category',
        LIST: (params?: GetCategoriesRequest) => {
            const keys = ['category-list']
            if (params) {
                if (params.isHide !== undefined) keys.push(`isHide:${params.isHide}`)
            }
            return keys
        },
        DETAIL: (categoryId: string) => ['category-detail', categoryId],
    },
}
