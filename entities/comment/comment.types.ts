import { comments } from 'drizzle/schema'

export type CommentProps = typeof comments.$inferSelect
export type DisplayingCommentType = Pick<CommentProps, 'commentId' | 'comment' | 'createdAt' | 'updatedAt' | 'nickname' | 'postId'>
