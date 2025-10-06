'use client'

import { CommentProps, commentQueries } from '@entities/comment'
import { Pagination } from '@features/common'
import { Button } from '@shared/ui/button'
import { Checkbox } from '@shared/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const CommentListManagement = () => {
    const router = useRouter()
    const [page, setPage] = useState(1)
    const [selectedComments, setSelectedComments] = useState<CommentProps[]>([])
    const { data: commentsData, refetch } = useQuery(commentQueries.all(page || 1))
    const { mutate: updateComments } = useMutation<CommentProps[], Error, number>({
        mutationFn: async (commentId: number) => {
            const data = await fetch(`/api/comment`, {
                method: 'PUT',
                body: JSON.stringify({ isHide: !commentsData?.comments.find((comment) => comment.commentId === commentId)?.isHide, commentId }),
            })
            return data.json()
        },
        onSuccess: () => {
            setSelectedComments([])
            fetch('/api/revalidate/comments', { method: 'POST' })
            refetch()
        },
    })

    return (
        <div className='flex flex-col size-full gap-2'>
            <h1 className='text-2xl'>Comment List</h1>

            <section className='flex justify-end gap-2'>
                <Button
                    variant={'outline'}
                    size={'sm'}
                    onClick={() => updateComments(selectedComments[0].commentId)}
                    disabled={selectedComments.length === 0}>
                    Toggle Hide Selected Comment
                </Button>
            </section>
            <div className='border rounded-sm'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-10'></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Post ID</TableHead>
                            <TableHead>Nickname</TableHead>
                            <TableHead>Comment</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {commentsData?.comments?.map((comment) => (
                            <TableRow key={comment.commentId} onClick={() => router.push(`/article/${comment.postId}`)}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedComments.includes(comment)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedComments((prev) => [...prev, comment])
                                            } else {
                                                setSelectedComments((prev) => prev.filter((c) => c.commentId !== comment.commentId))
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{comment.commentId}</TableCell>
                                <TableCell>{comment.postId}</TableCell>
                                <TableCell>{comment.nickname}</TableCell>
                                <TableCell>{comment.comment}</TableCell>
                                <TableCell>{comment.isHide ? 'Hidden' : 'Public'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                callbackFn={setPage}
                page={page}
                next={Number(commentsData?.total || 1) > page * (commentsData?.limit || 10) || false}
                prev={page > 1 || false}
                totalPage={commentsData?.totalPage || 0}
            />
        </div>
    )
}
