import 'server-only'
import { db } from '@db/db'
import { categories } from '@db/schema'
import { eq, InferSelectModel } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'
import { QUERY_KEY } from '@lib/constants'

export type Category = InferSelectModel<typeof categories>

export const getCategoryList = async () => {
    'use cache'
    cacheTag(QUERY_KEY.CATEGORY.LIST)
    cacheLife('max')
    return await db.select().from(categories).where(eq(categories.isHide, false))
}

export const createCategory = async (category: string) => {
    const [result] = await db.insert(categories).values({ category, isHide: false }).$returningId()
    const [newCategory] = await db.select().from(categories).where(eq(categories.categoryId, result.categoryId))
    return newCategory
}
