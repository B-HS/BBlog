import { useAdminPanelStateStore } from '@entities/admin'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
type ArticleRankingList = {
    title: string
    createdAt: Date
    path: string | null
    visitCount: number
}[]

export const ArticleRanking = ({ articleRanking }: { articleRanking?: ArticleRankingList }) => {
    const { setIsOpen } = useAdminPanelStateStore()
    const router = useRouter()
    const refectoredData = [...Array.from({ length: 10 }).map(() => [])].map((_, idx) => ({
        ...articleRanking?.at(idx),
    }))

    const redirectHandler = (path: string) => {
        router.push(path || '/')
        setIsOpen(false)
    }

    return (
        <section className='flex flex-col gap-2'>
            <span className='text-2xl font-bold  mt-5 mb-2'>Article Ranking</span>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>#</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Created at</TableHead>
                        <TableHead>Visitor</TableHead>
                    </TableRow>
                </TableHeader>
                {refectoredData?.map((article, idx) => (
                    <TableBody key={article.title || idx}>
                        <TableRow className='cursor-pointer' onClick={() => redirectHandler(article.path || '#')}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{article.title}</TableCell>
                            <TableCell>{article.createdAt ? dayjs(article.createdAt).format('YYYY-MM-DD') : ''}</TableCell>
                            <TableCell>{article.visitCount}</TableCell>
                            <TableCell>{article.path}</TableCell>
                        </TableRow>
                    </TableBody>
                ))}
            </Table>
        </section>
    )
}
