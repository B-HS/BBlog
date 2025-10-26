import 'server-only'
import { db } from '@db/db'
import { tags } from '@db/schema'
import { eq, InferSelectModel } from 'drizzle-orm'
import { QUERY_KEY } from '@lib/constants'
import { cacheLife, cacheTag } from 'next/cache'

export type Tag = InferSelectModel<typeof tags>

export const getTagList = async () => {
    'use cache'
    cacheTag(QUERY_KEY.TAG.LIST)
    cacheLife('max')
    return await db.select().from(tags)
}

export const createTag = async (tag: string) => {
    const [result] = await db.insert(tags).values({ tag }).$returningId()
    const [newTag] = await db.select().from(tags).where(eq(tags.tagId, result.tagId))
    return newTag
}
