'use client'

import { useDeleteComment, useGetAllComments, useUpdateCommentHide } from '@entities/admin.client'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@ui/alert-dialog'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Button } from '@ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table'
import dayjs from 'dayjs'
import { Eye, EyeOff, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

export const CommentsTable: FC = () => {
    const { data: comments, isLoading } = useGetAllComments()
    const { mutate: deleteComment } = useDeleteComment()
    const { mutate: updateCommentHide } = useUpdateCommentHide()

    if (isLoading) {
        return <div className='flex items-center justify-center p-6'>로딩 중...</div>
    }

    if (!comments || comments.length === 0) {
        return <div className='flex items-center justify-center p-6 text-muted-foreground'>댓글이 없습니다.</div>
    }

    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>작성자</TableHead>
                        <TableHead>게시글</TableHead>
                        <TableHead>댓글 내용</TableHead>
                        <TableHead>작성일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className='w-[100px]'>액션</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {comments.map((comment) => (
                        <TableRow key={comment.commentId}>
                            <TableCell className='font-mono text-xs'>{comment.commentId}</TableCell>
                            <TableCell>
                                <div className='flex items-center gap-2'>
                                    <Avatar className='size-5'>
                                        <AvatarImage src={comment.userImage || ''} alt={comment.userName} />
                                        <AvatarFallback>{comment.userName.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div className='flex flex-col'>
                                        <span className='text-sm font-medium'>{comment.userName}</span>
                                        <span className='text-xs text-muted-foreground'>{comment.userEmail}</span>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <Link
                                    href={`/article/${comment.postId}#comment-${comment.commentId}`}
                                    className='font-medium hover:underline'>
                                    {comment.postTitle}
                                </Link>
                            </TableCell>
                            <TableCell className='max-w-md truncate'>{comment.comment}</TableCell>
                            <TableCell className='text-muted-foreground'>{dayjs(comment.createdAt).format('YYYY.MM.DD HH:mm')}</TableCell>
                            <TableCell>
                                {comment.isHide ? (
                                    <span className='inline-flex items-center rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive'>
                                        숨김
                                    </span>
                                ) : (
                                    <span className='inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary'>
                                        공개
                                    </span>
                                )}
                            </TableCell>
                            <TableCell>
                                <div className='flex items-center gap-1'>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='size-7'
                                        onClick={() => updateCommentHide({ commentId: comment.commentId, isHide: !comment.isHide })}>
                                        {comment.isHide ? <Eye className='size-3.5' /> : <EyeOff className='size-3.5' />}
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant='ghost' size='icon' className='size-7'>
                                                <Trash2 className='size-3.5' />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>댓글 삭제</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    정말로 이 댓글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>취소</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deleteComment(comment.commentId)}>삭제</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
