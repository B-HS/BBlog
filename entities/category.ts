import { db } from '@db/db'
import { categories } from '@db/schema'
import { QUERY_KEY } from '@lib/constants'
import { eq, InferSelectModel } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import 'server-only'

export type Category = InferSelectModel<typeof categories>

export const getCategoryList = unstable_cache(
    async () => {
        return await db.select().from(categories).where(eq(categories.isHide, false))
    },
    [QUERY_KEY.CATEGORY.LIST],
    {
        revalidate: 60 * 60 * 24 * 30, // 30 days
        tags: [QUERY_KEY.CATEGORY.LIST],
    },
)

export const createCategory = async (category: string) => {
    const [result] = await db.insert(categories).values({ category, isHide: false }).$returningId()
    const [newCategory] = await db.select().from(categories).where(eq(categories.categoryId, result.categoryId))
    return newCategory
}
