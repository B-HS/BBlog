import { db } from '@db/db'
import { comments, user } from '@db/schema'
import 'server-only'
import { and, desc, eq, InferSelectModel } from 'drizzle-orm'

export type Comment = InferSelectModel<typeof comments>

export type CommentWithUser = Comment & {
    userName: string
    userImage: string | null
}

export const getCommentList = async (postId: number) => {
    const data = await db
        .select({
            commentId: comments.commentId,
            postId: comments.postId,
            userId: comments.userId,
            comment: comments.comment,
            updatedAt: comments.updatedAt,
            createdAt: comments.createdAt,
            isHide: comments.isHide,
            userName: user.name,
            userImage: user.image,
        })
        .from(comments)
        .leftJoin(user, eq(comments.userId, user.id))
        .where(eq(comments.postId, postId))
        .orderBy(desc(comments.createdAt))
        .execute()

    return data.map((comment) => ({
        ...comment,
        comment: comment.isHide ? undefined : comment.comment,
    }))
}

export const insertComment = async (data: { postId: number; userId: string; comment: string; isHide?: boolean }) => {
    const [comment] = await db
        .insert(comments)
        .values({
            postId: data.postId,
            userId: data.userId,
            comment: data.comment,
            isHide: data.isHide ?? false,
            updatedAt: new Date(),
            createdAt: new Date(),
        })
        .$returningId()

    return comment
}

export const updateComment = async (commentId: number, userId: string, comment: string, isHide?: boolean) => {
    const updateData: { comment: string; updatedAt: Date; isHide?: boolean } = {
        comment,
        updatedAt: new Date(),
    }

    if (isHide !== undefined) {
        updateData.isHide = isHide
    }

    await db
        .update(comments)
        .set(updateData)
        .where(and(eq(comments.commentId, commentId), eq(comments.userId, userId)))
}

export const deleteComment = async (commentId: number, userId: string) => {
    await db
        .update(comments)
        .set({ isHide: true })
        .where(and(eq(comments.commentId, commentId), eq(comments.userId, userId)))
}
