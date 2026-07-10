import { serverFetchData } from '@lib/api/client'
import { CACHE_TAG } from '@lib/constants'
import 'server-only'

export type Category = {
    categoryId: number
    category: string
    isHide: boolean
}

export const getCategoryList = async () => {
    const data = await serverFetchData<{ categories: Category[] }>('/api/blog/categories', {
        revalidate: 60 * 60 * 24 * 30,
        tags: [CACHE_TAG.CATEGORY_LIST],
    })
    return data.categories
}
