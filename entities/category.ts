import { serverFetchData } from '@lib/api/client'
import 'server-only'

export type Category = {
    categoryId: number
    category: string
    isHide: boolean
}

export const getCategoryList = async () => {
    const data = await serverFetchData<{ categories: Category[] }>('/api/blog/categories', {
        revalidate: 60 * 60 * 24 * 30,
        tags: ['categoryList'],
    })
    return data.categories
}
