'use client'

import { CommentWithUser } from '@entities/comment'
import { CommentItem } from './comment-item'
import { FC } from 'react'

interface CommentListProps {
    comments: CommentWithUser[]
    postId: number
}

export const CommentList: FC<CommentListProps> = ({ comments, postId }) => {
    if (comments.length === 0) {
        return <div className='p-8 text-center text-sm text-muted-foreground'>댓글이 없습니다.</div>
    }

    return (
        <div>
            {comments.map((comment) => (
                <CommentItem key={comment.commentId} comment={comment} postId={postId} />
            ))}
        </div>
    )
}
