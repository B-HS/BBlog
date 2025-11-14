'use client'

import { useDeleteUser, useGetAllUsers } from '@entities/admin.client'
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
import { Trash2 } from 'lucide-react'
import { FC } from 'react'

export const UsersTable: FC = () => {
    const { data: users, isLoading } = useGetAllUsers()
    const { mutate: deleteUser } = useDeleteUser()

    if (isLoading) {
        return <div className='flex items-center justify-center p-6'>로딩 중...</div>
    }

    if (!users || users.length === 0) {
        return <div className='flex items-center justify-center p-6 text-muted-foreground'>사용자가 없습니다.</div>
    }

    return (
        <div className='rounded-md border'>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='w-[100px]'>ID</TableHead>
                        <TableHead>이름</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead>역할</TableHead>
                        <TableHead>게시글 수</TableHead>
                        <TableHead>댓글 수</TableHead>
                        <TableHead>가입일</TableHead>
                        <TableHead>상태</TableHead>
                        <TableHead className='w-[80px]'>액션</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell className='font-mono text-xs'>{user.id.slice(0, 8)}</TableCell>
                            <TableCell className='font-medium'>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <span
                                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                                        user.role === 'admin'
                                            ? 'bg-destructive/10 text-destructive'
                                            : 'bg-secondary text-secondary-foreground'
                                    }`}>
                                    {user.role === 'admin' ? '관리자' : '사용자'}
                                </span>
                            </TableCell>
                            <TableCell className='text-center'>{user.postsCount}</TableCell>
                            <TableCell className='text-center'>{user.commentsCount}</TableCell>
                            <TableCell className='text-muted-foreground'>{dayjs(user.createdAt).format('YYYY.MM.DD')}</TableCell>
                            <TableCell>
                                {user.banned ? (
                                    <span className='inline-flex items-center rounded-full bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive'>
                                        차단됨
                                    </span>
                                ) : (
                                    <span className='inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary'>
                                        활성
                                    </span>
                                )}
                            </TableCell>
                            <TableCell>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant='ghost' size='icon' className='size-7'>
                                            <Trash2 className='size-3.5' />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                            <AlertDialogTitle>사용자 삭제</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                정말로 이 사용자를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
                                            </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>취소</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => deleteUser(user.id)}>삭제</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}
