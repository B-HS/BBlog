import { db } from '@db/db'
import { tags } from '@db/schema'
import { QUERY_KEY } from '@lib/constants'
import { eq, InferSelectModel } from 'drizzle-orm'
import { unstable_cache } from 'next/cache'
import 'server-only'

export type Tag = InferSelectModel<typeof tags>

export const getTagList = unstable_cache(
    async () => {
        return await db.select().from(tags)
    },
    [QUERY_KEY.TAG.LIST],
    {
        revalidate: 60 * 60 * 24 * 30, // 30 days
        tags: [QUERY_KEY.TAG.LIST],
    },
)

export const createTag = async (tag: string) => {
    const [result] = await db.insert(tags).values({ tag }).$returningId()
    const [newTag] = await db.select().from(tags).where(eq(tags.tagId, result.tagId))
    return newTag
}
