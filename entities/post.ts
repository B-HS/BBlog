import 'server-only'
import { db } from '@db/db'
import { categories, posts, postTags, tags } from '@db/schema'
import { QUERY_KEY } from '@lib/constants'
import { and, desc, eq, like, sql, InferSelectModel } from 'drizzle-orm'
import { cacheLife, cacheTag } from 'next/cache'

export type Post = InferSelectModel<typeof posts>

export type PostDetail = {
    postId: number
    categoryId: number
    categoryName: string | null
    title: string
    description: string
    updatedAt: Date
    createdAt: Date
    views: number
    isPublished: boolean
    isHide: boolean
    isNotice: boolean
    isComment: boolean
    tags: { tagId: number; tag: string }[]
}

export type GetPostListParams = {
    offset?: number
    limit?: number
    keyword?: string
    categoryId?: number
    tagId?: number
    isPublished?: boolean
    isHide?: boolean
    isNotice?: boolean
}

export const getPostList = async ({
    offset = 0,
    limit = 12,
    keyword,
    categoryId,
    tagId,
    isPublished = true,
    isHide = false,
    isNotice = false,
}: GetPostListParams) => {
    'use cache'

    const parsedOffset = Number(offset)
    const parsedLimit = Number(limit)
    const parsedCategoryId = categoryId ? Number(categoryId) : undefined
    const parsedTagId = tagId ? Number(tagId) : undefined

    cacheTag(
        ...QUERY_KEY.POST.LIST({
            offset: parsedOffset,
            limit: parsedLimit,
            keyword,
            categoryId: parsedCategoryId,
            tagId: parsedTagId,
            isPublished,
            isHide,
            isNotice,
        }),
    )
    cacheLife('max')

    const tagsSubquery = db
        .select({
            postId: postTags.postId,
            tags: sql<string>`JSON_ARRAYAGG(JSON_OBJECT('tagId', ${tags.tagId}, 'tag', ${tags.tag}))`.as('tags'),
        })
        .from(postTags)
        .leftJoin(tags, eq(postTags.tagId, tags.tagId))
        .groupBy(postTags.postId)
        .as('post_tags_agg')

    let query = db
        .select({
            postId: posts.postId,
            categoryId: posts.categoryId,
            categoryName: categories.category,
            title: posts.title,
            updatedAt: posts.updatedAt,
            createdAt: posts.createdAt,
            views: posts.views,
            isPublished: posts.isPublished,
            isHide: posts.isHide,
            isNotice: posts.isNotice,
            isComment: posts.isComment,
            tags: sql<{ tagId: number; tag: string }[]>`COALESCE(${tagsSubquery.tags}, JSON_ARRAY())`,
        })
        .from(posts)
        .leftJoin(categories, eq(posts.categoryId, categories.categoryId))
        .leftJoin(tagsSubquery, eq(posts.postId, tagsSubquery.postId))
        .$dynamic()

    const conditions = []

    if (keyword) {
        conditions.push(like(posts.title, `%${keyword}%`))
    }

    if (parsedCategoryId) {
        conditions.push(eq(posts.categoryId, parsedCategoryId))
    }

    if (parsedTagId) {
        query = query.leftJoin(postTags, eq(posts.postId, postTags.postId))
        conditions.push(eq(postTags.tagId, parsedTagId))
    }

    conditions.push(eq(posts.isPublished, isPublished))
    conditions.push(eq(posts.isHide, isHide))
    conditions.push(eq(posts.isNotice, isNotice))

    if (conditions.length > 0) {
        query = query.where(and(...conditions))
    }

    const data = await query.orderBy(desc(posts.createdAt), desc(posts.postId)).limit(parsedLimit).offset(parsedOffset)

    let countQuery = db
        .select({ count: sql<number>`COUNT(*)` })
        .from(posts)
        .$dynamic()

    if (parsedTagId) {
        countQuery = countQuery.leftJoin(postTags, eq(posts.postId, postTags.postId))
    }

    if (conditions.length > 0) {
        countQuery = countQuery.where(and(...conditions))
    }

    const [{ count }] = await countQuery

    return { data, total: count }
}

export const getPost = async (id: string | number): Promise<PostDetail[]> => {
    const tagsSubquery = db
        .select({
            postId: postTags.postId,
            tags: sql<string>`JSON_ARRAYAGG(JSON_OBJECT('tagId', ${tags.tagId}, 'tag', ${tags.tag}))`.as('tags'),
        })
        .from(postTags)
        .leftJoin(tags, eq(postTags.tagId, tags.tagId))
        .groupBy(postTags.postId)
        .as('post_tags_agg')
    return await db
        .select({
            postId: posts.postId,
            categoryId: posts.categoryId,
            categoryName: categories.category,
            title: posts.title,
            description: posts.description,
            updatedAt: posts.updatedAt,
            createdAt: posts.createdAt,
            views: posts.views,
            isPublished: posts.isPublished,
            isHide: posts.isHide,
            isNotice: posts.isNotice,
            isComment: posts.isComment,
            tags: sql<{ tagId: number; tag: string }[]>`COALESCE(${tagsSubquery.tags}, JSON_ARRAY())`,
        })
        .from(posts)
        .leftJoin(categories, eq(posts.categoryId, categories.categoryId))
        .leftJoin(tagsSubquery, eq(posts.postId, tagsSubquery.postId))
        .where(eq(posts.postId, Number(id)))
        .limit(1)
}

export const insertPost = async (data: { title: string; description: string; categoryId: number; tagIds: number[]; isPublished: boolean }) => {
    const [post] = await db
        .insert(posts)
        .values({
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            isPublished: data.isPublished,
        })
        .$returningId()

    if (data.tagIds.length > 0) {
        await db.insert(postTags).values(data.tagIds.map((tagId) => ({ postId: post.postId, tagId })))
    }

    return post
}

export const updatePost = async (
    postId: number,
    data: { title: string; description: string; categoryId: number; tagIds: number[]; isPublished: boolean },
) => {
    await db
        .update(posts)
        .set({
            title: data.title,
            description: data.description,
            categoryId: data.categoryId,
            isPublished: data.isPublished,
            updatedAt: new Date(),
        })
        .where(eq(posts.postId, postId))

    await db.delete(postTags).where(eq(postTags.postId, postId))

    if (data.tagIds.length > 0) {
        await db.insert(postTags).values(data.tagIds.map((tagId) => ({ postId, tagId })))
    }

    return { postId }
}

export const createPost = async (data: { title: string; description: string; categoryId: number; tagIds: number[]; isPublished: boolean }) => {
    const response = await fetch('/api/post', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })

    if (!response.ok) {
        throw new Error('Failed to create post')
    }

    return await response.json()
}
