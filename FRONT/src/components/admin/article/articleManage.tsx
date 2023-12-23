import { getAllPost, savePost } from '@/api/article/post'
import dayjs from 'dayjs'
import { ArrowUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Article } from '../../article/articleContext'
import { Button } from '../../ui/button'
import { TabsContent } from '../../ui/tabs'
import Modify from './articleModify'
import { DataTable } from '../table/components/data-table'
import { DataTableRowActions } from '../table/components/data-table-row-actions'
const ArticleManage = () => {
    const [postlist, setPostlist] = useState<Article[]>([])
    const [currentArticle, setCurrentArticle] = useState<Article>()
    const columns = ['aid', 'title', 'context', 'tags', 'mekey', 'insertdate']
    const removeRow = (row: Article) =>
        savePost({ ...row, hide: true }).then((data) => {
            data && loadPost()
        })

    const editRow = (row: Article) => setCurrentArticle(row)

    const loadPost = async () => setPostlist(await getAllPost())
    useEffect(() => {
        loadPost()
    }, [])

    return (
        <TabsContent className='w-full' value='article'>
            <DataTable
                filterTarget='title'
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
                        id: 'actions',
                        cell: ({ row }) => <DataTableRowActions remove={removeRow} edit={editRow} row={row} />,
                    },
                ]}
                data={
                    postlist.map((post) => ({
                        ...post,
                        insertdate: dayjs(post.insertdate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm'),
                        context: post.context.replace(/(<([^>]+)>)/gi, '').slice(0, 30),
                    })) as any[]
                }
            />
            {currentArticle && <Modify article={currentArticle} />}
        </TabsContent>
    )
}

export default ArticleManage
