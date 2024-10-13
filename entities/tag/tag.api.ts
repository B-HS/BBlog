import { auth } from '@shared/auth'
import { db } from 'drizzle'
import { and, eq, sql } from 'drizzle-orm'
import { categories, posts, postTags, tags } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'

const handleError = (msg: unknown, status: number = 500) => NextResponse.json({ message: msg || 'An error occurred' }, { status })
export const GET = async (_: NextRequest, { params }: { params: { tag: string } }) => {
    const session = await auth()

    try {
        const tag = params.tag
        if (!tag) return handleError('No tag provided', 400)

        const conditions = []
        !session?.user && conditions.push(eq(categories.isHide, false))

        const query = db
            .select({
                post: posts,
                tags: sql`GROUP_CONCAT(${tags.tag} ORDER BY ${tags.tagId} SEPARATOR ',')`,
            })
            .from(posts)
            .leftJoin(postTags, eq(posts.postId, postTags.postId))
            .leftJoin(tags, eq(postTags.tagId, tags.tagId))
            .leftJoin(categories, eq(posts.categoryId, categories.categoryId))
            .where(and(eq(tags.tag, tag), ...conditions))
            .groupBy(posts.postId)

        const postList = await query.execute()
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
                        updatedAt: post.updatedAt,
                        isNotice: post.isNotice,
                        tags: tags?.split(','),
                    }
                }),
                categories: categoryList,
            },
            { status: 200 },
        )
    } catch (error) {
        return handleError(error)
    }
}

export const tagApi = { GET }
