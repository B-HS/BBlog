import { auth } from '@shared/auth'
import { db } from 'drizzle'
import { and, desc, eq, inArray, like, sql } from 'drizzle-orm'
import { categories, comments, posts, postTags, tags, temporalPost } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'
const handleError = (error: unknown, status: number = 500) => NextResponse.json({ message: 'An error occurred', error }, { status })

export const PostListGET = async (req: NextRequest) => {
    const session = await auth()

    try {
        const page = Number(req.nextUrl.searchParams.get('page') || '1')
        const categoryId = Number(req.nextUrl.searchParams.get('categoryId') || '0')
        const keywords = req.nextUrl.searchParams.get('keywords') || undefined
        const isDescription = req.nextUrl.searchParams.get('desc') === 'true'
        const isAll = req.nextUrl.searchParams.get('all') === 'true'
        const limit = Math.min(Number(req.nextUrl.searchParams.get('limit') || '20'), 100)

        const conditions = []
        !session?.user && conditions.push(eq(posts.isHide, false))
        !session?.user && conditions.push(eq(categories.isHide, false))
        keywords && conditions.push(like(posts.title, `%${keywords}%`))

        const query = db
            .select({
                post: posts,
                tags: sql`GROUP_CONCAT(${tags.tag} ORDER BY ${tags.tagId} SEPARATOR ',')`,
            })
            .from(posts)
            .leftJoin(postTags, eq(posts.postId, postTags.postId))
            .leftJoin(tags, eq(postTags.tagId, tags.tagId))
            .leftJoin(categories, eq(posts.categoryId, categories.categoryId))
            .groupBy(posts.postId)
            .orderBy(desc(posts.updatedAt))

        if (!isAll) {
            query.limit(limit)
            query.offset((page - 1) * limit)
        }

        if (categoryId > 0) {
            conditions.push(eq(posts.categoryId, categoryId))
            const category = await db
                .select()
                .from(categories)
                .where(and(eq(categories.categoryId, categoryId), !session?.user ? eq(categories.isHide, false) : undefined))
            if (category.length === 0) return NextResponse.json({ posts: [] }, { status: 200 })
            const postsWithCategory = await query.where(and(...conditions)).execute()

            return NextResponse.json(
                {
                    posts: postsWithCategory.map((postObj) => {
                        const { post, tags } = postObj as { post: typeof posts.$inferSelect; tags: string }
                        return {
                            postId: post.postId,
                            title: post.title,
                            categoryId: post.categoryId,
                            createdAt: post.createdAt,
                            updatedAt: post.updatedAt,
                            isNotice: post.isNotice,
                            tags: tags?.split(','),
                            ...(isDescription && { description: post.description }),
                            ...(session?.user && { isHide: post.isHide }),
                        }
                    }),
                    categories: category,
                },
                { status: 200 },
            )
        }

        const postList = await query.where(and(...conditions)).execute()

        const categoryList = await db
            .select()
            .from(categories)
            .where(session?.user ? undefined : eq(categories.isHide, false))
            .execute()

        return NextResponse.json(
            {
                posts: postList.map((postObj) => {
                    const { post, tags } = postObj as { post: typeof posts.$inferSelect; tags: string }
                    return {
                        postId: post.postId,
                        title: post.title,
                        categoryId: post.categoryId,
                        createdAt: post.createdAt,
                        updatedAt: post.updatedAt,
                        isNotice: post.isNotice,
                        tags: tags?.split(','),
                        ...(isDescription && { description: post.description }),
                        ...(session?.user && { isHide: post.isHide }),
                    }
                }),
                categories: categoryList,
            },
            { status: 200 },
        )
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const PostGet = async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const session = await auth()
    const postId = Number(id)
    if (!postId) {
        return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 })
    }

    const conditions = []
    !session?.user && conditions.push(eq(posts.isHide, false))
    !session?.user && conditions.push(eq(categories.isHide, false))
    conditions.push(eq(posts.postId, postId))

    try {
        const result = await db
            .select({
                post: posts,
                categories: categories,
                tags: sql`GROUP_CONCAT(${tags.tag} ORDER BY ${tags.tagId} SEPARATOR ',')`,
            })
            .from(posts)
            .leftJoin(postTags, eq(posts.postId, postTags.postId))
            .leftJoin(tags, eq(postTags.tagId, tags.tagId))
            .leftJoin(categories, eq(posts.categoryId, categories.categoryId))
            .where(and(...conditions))
            .groupBy(posts.postId)
            .execute()

        if (result.length === 0) {
            return NextResponse.json({ message: 'Post not found' }, { status: 404 })
        }

        const postViews = result[0].post.views + 1
        await db.update(posts).set({ views: postViews }).where(eq(posts.postId, postId)).execute()

        const commentList = await db
            .select({
                comment: comments.comment,
                postId: comments.postId,
                nickname: comments.nickname,
                createdAt: comments.createdAt,
                updatedAt: comments.updatedAt,
                commentId: comments.commentId,
            })
            .from(comments)
            .where(eq(comments.postId, postId))

        const postWithComments = {
            post: result.at(0)?.post,
            category: result.at(0)?.categories?.category,
            categoryId: result.at(0)?.categories?.categoryId,
            comments: commentList,
            tags: result.map((row) => row.tags).filter((tag) => tag !== null),
        }

        return NextResponse.json(postWithComments)
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const PostWrite = async (req: NextRequest) => {
    try {
        const body = await req.json()
        const {
            title,
            description,
            categoryId,
            tags: postTagsListRaw,
        } = body as { title: string; description: string; categoryId: number; tags: string[] }
        const postTagsList = postTagsListRaw || []

        if (!title || !description || !categoryId) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 })
        }

        const postId = await db.transaction(async (tx) => {
            const [post] = await tx
                .insert(posts)
                .values({
                    title,
                    description,
                    categoryId: categoryId,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                })
                .$returningId()
            const postId = post.postId

            if (postTagsList?.length > 0) {
                const existTagList = await tx.select().from(tags).where(inArray(tags.tag, postTagsList))
                const existTags = existTagList.map((tag) => tag.tag)
                const newTags = postTagsList.filter((tag) => !existTags.includes(tag))
                const processedTagIds = existTagList.map((tag) => tag.tagId)

                if (newTags.length > 0) {
                    const tagIds = await tx
                        .insert(tags)
                        .values(newTags.map((tag) => ({ tag })))
                        .$returningId()

                    processedTagIds.push(...tagIds.map((tag) => tag.tagId))
                }

                if (processedTagIds.length > 0) {
                    const tagInserts = processedTagIds.map((tagId) => ({
                        postId,
                        tagId,
                    }))

                    await tx.insert(postTags).values(tagInserts).execute()
                }
            }
            return postId
        })

        return NextResponse.json({ postId }, { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const PostUpdate = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const postId = Number(id)
    if (!postId) {
        return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 })
    }

    try {
        const body = await req.json()
        const {
            title,
            description,
            categoryId,
            tags: updatedTagsList,
        } = body as { title?: string; description?: string; categoryId?: number; tags?: string[] }

        if (!title && !description && !categoryId && !updatedTagsList) {
            return NextResponse.json({ message: 'No fields provided for update' }, { status: 400 })
        }

        const updateData: Partial<typeof posts.$inferSelect> = {
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(categoryId ? { categoryId } : {}),
            updatedAt: new Date(),
        }

        await db.transaction(async (tx) => {
            Object.keys(updateData).length > 0 && (await tx.update(posts).set(updateData).where(eq(posts.postId, postId)).execute())

            if (updatedTagsList && updatedTagsList.length > 0) {
                const existingTagsWithNames = await tx
                    .select({ tagId: postTags.tagId, tagName: tags.tag })
                    .from(postTags)
                    .innerJoin(tags, eq(postTags.tagId, tags.tagId))
                    .where(eq(postTags.postId, postId))

                const tagsToRemove = existingTagsWithNames.filter((tag) => !updatedTagsList.includes(tag.tagName))

                if (tagsToRemove.length > 0) {
                    await tx
                        .delete(postTags)
                        .where(
                            and(
                                eq(postTags.postId, postId),
                                inArray(
                                    postTags.tagId,
                                    tagsToRemove.map((t) => t.tagId),
                                ),
                            ),
                        )
                        .execute()
                }

                const existTagList = await tx.select().from(tags).where(inArray(tags.tag, updatedTagsList))
                const existTags = existTagList.map((tag) => tag.tag)
                const newTags = updatedTagsList.filter((tag) => !existTags.includes(tag))

                if (newTags.length > 0) {
                    console.log(newTags)
                    const tagIds = await tx
                        .insert(tags)
                        .values(newTags.map((tag) => ({ tag })))
                        .$returningId()
                    const processedTagIds = [...existTagList.map((tag) => tag.tagId), ...tagIds.map((tag) => tag.tagId)]

                    const tagInserts = processedTagIds.map((tagId) => ({
                        postId,
                        tagId,
                    }))
                    await tx.insert(postTags).values(tagInserts).execute()
                }
            }
        })

        return NextResponse.json({ message: 'Post updated successfully', postId: id }, { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const PostDelete = async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const postId = Number(id)
    if (!postId) {
        return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 })
    }

    try {
        await db.transaction(async (tx) => {
            await tx.delete(postTags).where(eq(postTags.postId, postId)).execute()
            await tx.delete(posts).where(eq(posts.postId, postId)).execute()
        })

        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const TemporalPostWrite = async (req: NextRequest) => {
    try {
        const body: { title: string; description: string; categoryId: number; tags: string[] } = await req.json()
        console.log({ ...body, tags: body.tags.join(',') })
        await db
            .insert(temporalPost)
            .values({ ...body, tags: body.tags.join(',') })
            .execute()
        return NextResponse.json({ message: 'OK' }, { status: 200 })
    } catch (error) {
        console.log(error)
        return handleError(error)
    }
}

export const TemporalPostListGet = async (req: NextRequest) => {
    try {
        const posts = await db.select().from(temporalPost).execute()
        return NextResponse.json(posts)
    } catch (error) {
        return handleError(error)
    }
}

export const TemporalPostDelete = async (_: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const postId = Number(id)
    if (!postId) {
        return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 })
    }

    try {
        await db.delete(temporalPost).where(eq(temporalPost.postId, postId)).execute()
        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const TemporalPostUpdate = async (req: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const postId = Number(id)
    if (!postId) {
        return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 })
    }

    try {
        const body = await req.json()
        const { title, description, categoryId, tags } = body as { title?: string; description?: string; categoryId?: number; tags?: string[] }

        if (!title && !description && !categoryId && !tags) {
            return NextResponse.json({ message: 'No fields provided for update' }, { status: 400 })
        }

        const updateData: Partial<typeof temporalPost.$inferSelect> = {
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(categoryId ? { categoryId } : {}),
            ...(tags ? { tags: tags.join(',') } : {}),
        }

        await db.update(temporalPost).set(updateData).where(eq(temporalPost.postId, postId)).execute()

        return NextResponse.json({ message: 'Post updated successfully', postId: id }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const TemporalPostApi = { GET: TemporalPostListGet, POST: TemporalPostWrite, PUT: TemporalPostUpdate, DELETE: TemporalPostDelete }
export const PostListApi = { GET: PostListGET }
export const PostApi = { GET: PostGet, POST: PostWrite, PUT: PostUpdate, DELETE: PostDelete }
