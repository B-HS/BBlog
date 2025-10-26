'use client'

import { CommentWithUser } from '@entities/comment'
import { useDeleteComment, useUpdateComment } from '@entities/comment.client'
import { authClient } from '@lib/auth/auth-client'
import { cn } from '@lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Button } from '@ui/button'
import { Checkbox } from '@ui/checkbox'
import { Textarea } from '@ui/textarea'
import { User } from 'better-auth'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import relativeTime from 'dayjs/plugin/relativeTime'
import { Check, Pencil, Trash2, X } from 'lucide-react'
import { FC, useEffect, useState } from 'react'

dayjs.extend(relativeTime)
dayjs.locale('ko')

interface CommentItemProps {
    comment: CommentWithUser
    postId: number
}

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export const CommentItem: FC<CommentItemProps> = ({ comment, postId }) => {
    const [user, setUser] = useState<User>()
    const [isEditing, setIsEditing] = useState(false)
    const [editedComment, setEditedComment] = useState(comment.comment)
    const [editedIsHide, setEditedIsHide] = useState(comment.isHide ?? false)
    const { mutate: updateComment, isPending: isUpdating } = useUpdateComment()
    const { mutate: deleteComment, isPending: isDeleting } = useDeleteComment()

    useEffect(() => {
        authClient.getSession().then((session) => {
            setUser(session.data?.user)
        })
    }, [])

    const isOwner = user?.id === comment.userId

    const handleUpdate = () => {
        if (!editedComment.trim()) return
        updateComment(
            { commentId: comment.commentId, postId, comment: editedComment, isHide: editedIsHide },
            {
                onSuccess: () => setIsEditing(false),
            },
        )
    }

    const handleDelete = () => {
        if (!confirm('댓글을 삭제하시겠습니까?')) return
        deleteComment({ commentId: comment.commentId, postId })
    }

    const handleCancelEdit = () => {
        setEditedComment(comment.comment)
        setEditedIsHide(comment.isHide ?? false)
        setIsEditing(false)
    }

    return (
        <div className='p-3.5 flex gap-3 border-b border-border'>
            <Avatar className='size-8 flex-shrink-0'>
                <AvatarImage src={comment.userImage ?? undefined} alt={comment.userName} />
                <AvatarFallback className='text-xs'>{getInitials(comment.userName)}</AvatarFallback>
            </Avatar>
            <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between gap-2 mb-1'>
                    <div className='flex items-center gap-2'>
                        <span className='text-sm font-semibold'>{comment.userName}</span>
                        <span className='text-xs text-muted-foreground'>{dayjs(comment.createdAt).fromNow()}</span>
                    </div>
                    {isOwner && !isEditing && (
                        <div className='flex gap-1'>
                            <Button variant='ghost' size='icon' className='size-7' onClick={() => setIsEditing(true)} disabled={isDeleting}>
                                <Pencil className='size-3.5' />
                            </Button>
                            <Button variant='ghost' size='icon' className='size-7' onClick={handleDelete} disabled={isDeleting}>
                                <Trash2 className='size-3.5' />
                            </Button>
                        </div>
                    )}
                </div>
                {isEditing ? (
                    <div className='flex flex-col gap-2'>
                        <Textarea
                            value={editedComment}
                            onChange={(e) => setEditedComment(e.target.value)}
                            className='min-h-20 resize-none text-sm'
                            disabled={isUpdating}
                        />
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center gap-2 text-sm cursor-pointer'>
                                <Checkbox
                                    checked={editedIsHide}
                                    onCheckedChange={(checked: boolean) => setEditedIsHide(checked === true)}
                                    disabled={isUpdating}
                                />
                                <span className='text-muted-foreground'>비밀글</span>
                            </label>
                            <div className='flex gap-2'>
                                <Button variant='ghost' size='sm' onClick={handleCancelEdit} disabled={isUpdating}>
                                    <X className='size-4 mr-1' />
                                    취소
                                </Button>
                                <Button size='sm' onClick={handleUpdate} disabled={isUpdating || !editedComment.trim()}>
                                    <Check className='size-4 mr-1' />
                                    {isUpdating ? '수정 중...' : '수정'}
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p className={cn('text-sm text-primary whitespace-pre-wrap break-words', comment.isHide && 'text-muted-foreground')}>
                        {comment.comment || '비밀글입니다.'}
                    </p>
                )}
            </div>
        </div>
    )
}
