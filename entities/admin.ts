import { db } from '@db/db'
import { categories, comments, posts, user } from '@db/schema'
import { desc, eq, InferSelectModel, sql } from 'drizzle-orm'
import 'server-only'

export type User = InferSelectModel<typeof user>

export type UserWithStats = User & {
    postsCount: number
    commentsCount: number
}

export type PostWithCategory = {
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
}

export type CommentWithPost = {
    commentId: number
    postId: number
    postTitle: string
    userId: string
    userName: string
    userEmail: string
    userImage: string | null
    comment: string
    updatedAt: Date
    createdAt: Date
    isHide: boolean
}

export const getAllUsers = async () => {
    const users = await db
        .select({
            id: user.id,
            name: user.name,
            email: user.email,
            emailVerified: user.emailVerified,
            image: user.image,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role,
            banned: user.banned,
            banReason: user.banReason,
            banExpires: user.banExpires,
            postsCount: sql<number>`(SELECT COUNT(*) FROM ${posts} WHERE ${posts.postId} IS NOT NULL)`,
            commentsCount: sql<number>`(SELECT COUNT(*) FROM ${comments} WHERE ${comments.userId} = ${user.id})`,
        })
        .from(user)
        .orderBy(desc(user.createdAt))

    return users as UserWithStats[]
}

export const getAllPosts = async () => {
    const allPosts = await db
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
        })
        .from(posts)
        .leftJoin(categories, sql`${posts.categoryId} = ${categories.categoryId}`)
        .orderBy(desc(posts.createdAt))

    return allPosts as PostWithCategory[]
}

export const getAllComments = async () => {
    const allComments = await db
        .select({
            commentId: comments.commentId,
            postId: comments.postId,
            postTitle: posts.title,
            userId: comments.userId,
            userName: user.name,
            userEmail: user.email,
            userImage: user.image,
            comment: comments.comment,
            updatedAt: comments.updatedAt,
            createdAt: comments.createdAt,
            isHide: comments.isHide,
        })
        .from(comments)
        .leftJoin(posts, sql`${comments.postId} = ${posts.postId}`)
        .leftJoin(user, sql`${comments.userId} = ${user.id}`)
        .orderBy(desc(comments.createdAt))

    return allComments as CommentWithPost[]
}

export const deleteUser = async (userId: string) => {
    await db.delete(user).where(eq(user.id, userId))
    return { id: userId }
}

export const deletePost = async (postId: number) => {
    await db.delete(posts).where(eq(posts.postId, postId))
    return { postId }
}

export const updatePostHide = async (postId: number, isHide: boolean) => {
    await db.update(posts).set({ isHide, updatedAt: new Date() }).where(eq(posts.postId, postId))
    return { postId, isHide }
}

export const deleteComment = async (commentId: number) => {
    await db.delete(comments).where(eq(comments.commentId, commentId))
    return { commentId }
}

export const updateCommentHide = async (commentId: number, isHide: boolean) => {
    await db.update(comments).set({ isHide, updatedAt: new Date() }).where(eq(comments.commentId, commentId))
    return { commentId, isHide }
}
