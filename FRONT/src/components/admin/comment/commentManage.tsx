'use client'
import { deleteCommentAdmin, getAllComments } from '@/api/admin/commnet'
import { Comment } from '@/components/article/comment'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { TabsContent } from '@/components/ui/tabs'
import dayjs from 'dayjs'
import { ArrowUpDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import { DataTable } from '../table/components/data-table'
import { DataTableRowActions } from '../table/components/data-table-row-actions'
import { LoadingContext } from '@/module/context/loading'

const CommentManage = () => {
    const { isLoading } = useContext(LoadingContext)
    const router = useRouter()
    const [comments, setComments] = useState<Comment[]>([])
    const columns = ['cid', 'nickname', 'context', 'deleted', 'insertdate']
    const setList = async () => setComments(await getAllComments())
    useEffect(() => {
        setList()
    }, [])

    const removeRow = (row: Comment) => deleteCommentAdmin(row).then(() => setList())
    return (
        !isLoading && (
            <TabsContent className='w-full' value='comment'>
                <DataTable
                    columns={[
                        ...columns.map((col) => ({
                            accessorKey: col,
                            header: ({ column }: any) => {
                                return (
                                    <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                                        {col.toLowerCase()}
                                        <ArrowUpDown className='ml-2 h-4 w-4' />
                                    </Button>
                                )
                            },
                        })),
                        {
                            header: 'aid',
                            id: 'aid',
                            cell: ({ row }) => (
                                <Badge className='cursor-pointer rounded' onClick={() => router.push(`/article/${row.original.aid}`)}>
                                    {row.original.aid}
                                </Badge>
                            ),
                        },
                        {
                            id: 'actions',
                            cell: ({ row }) => <DataTableRowActions remove={removeRow} row={row} />,
                        },
                    ]}
                    data={
                        comments.map((comment: Comment) => ({
                            ...comment,
                            insertdate: dayjs(comment.insertdate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm'),
                            context: comment.context.replace(/(<([^>]+)>)/gi, '').slice(0, 30),
                        })) as any[]
                    }
                />
            </TabsContent>
        )
    )
}

export default CommentManage
