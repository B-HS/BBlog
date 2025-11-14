'use client'

import { useDeletePost, useGetAllPosts, useUpdatePostHide } from '@entities/admin.client'
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
import { Button } from '@ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ui/table'
import dayjs from 'dayjs'
import { Eye, EyeOff, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'

export const PostsTable: FC = () => {
    const { data: posts, isLoading } = useGetAllPosts()
    const { mutate: deletePost } = useDeletePost()
    const { mutate: updatePostHide } = useUpdatePostHide()

    if (isLoading) {
        return <div className='flex items-center justify-center p-6'>로딩 중...</div>
    }

    if (!posts || posts.length === 0) {
        return <div className='flex items-center justify-center p-6 text-muted-foreground'>게시글이 없습니다.</div>
    }

    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[80px]'>ID</TableHead>
                        <TableHead>제목</TableHead>
                        <TableHead>카테고리</TableHead>
                        <TableHead className='text-center'>조회수</TableHead>
                        <TableHead>작성일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className='w-[100px]'>액션</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {posts.map((post) => (
                        <TableRow key={post.postId}>
                            <TableCell className='font-mono text-xs'>{post.postId}</TableCell>
                            <TableCell>
                                <Link href={`/article/${post.postId}`} className='font-medium hover:underline'>
                                    {post.title}
                                </Link>
                            </TableCell>
                            <TableCell>
                                <span className='inline-flex items-center rounded-full bg-secondary px-2 py-1 text-xs font-medium text-secondary-foreground'>
                                    {post.categoryName || '미분류'}
                                </span>
                            </TableCell>
                            <TableCell className='text-center'>{post.views}</TableCell>
                            <TableCell className='text-muted-foreground'>{dayjs(post.createdAt).format('YYYY.MM.DD HH:mm')}</TableCell>
                            <TableCell>
                                <div className='flex flex-col gap-1'>
                                    {post.isPublished ? (
                                        <span className='inline-flex w-fit items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary'>
                                            공개
                                        </span>
                                    ) : (
                                        <span className='inline-flex w-fit items-center rounded-full bg-muted px-2 py-1 text-xs font-medium text-muted-foreground'>
                                            비공개
                                        </span>
                                    )}
                                    {post.isHide && (
                                        <span className='inline-flex w-fit items-center rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive'>
                                            숨김
                                        </span>
                                    )}
                                    {post.isNotice && (
                                        <span className='inline-flex w-fit items-center rounded-full bg-accent px-2 py-1 text-xs font-medium text-accent-foreground'>
                                            공지
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='flex items-center gap-1'>
                                    <Button
                                        variant='ghost'
                                        size='icon'
                                        className='size-7'
                                        onClick={() => updatePostHide({ postId: post.postId, isHide: !post.isHide })}>
                                        {post.isHide ? <Eye className='size-3.5' /> : <EyeOff className='size-3.5' />}
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant='ghost' size='icon' className='size-7'>
                                                <Trash2 className='size-3.5' />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>게시글 삭제</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    정말로 이 게시글을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>취소</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => deletePost(post.postId)}>삭제</AlertDialogAction>
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
