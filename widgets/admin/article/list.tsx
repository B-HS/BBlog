import { Article } from '@entities/article'
import { adminQueries } from '@entities/admin'
import { Pagination } from '@features/common'
import { Button } from '@shared/ui/button'
import { Checkbox } from '@shared/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { useToast } from '@shared/ui/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const ArticleListManagement = () => {
    const LIMIT_PER_PAGE = 10
    const { toast } = useToast()
    const [page, setPage] = useState(1)
    const [selectedArticles, setSelectedArticles] = useState<Article[]>([])

    const { data: categories } = useQuery(adminQueries.categories())

    const { data: articlesData, refetch } = useQuery({
        ...adminQueries.articles(page, LIMIT_PER_PAGE),
        enabled: Boolean(categories),
    })

    const { mutate: updateArticleStatus } = useMutation({
        mutationKey: ['setHideArticle'],
        mutationFn: async (props: Article[]) => {
            const updateFetchObj = props.map(async (article) => fetch('/api/admin/article', { method: 'PUT', body: JSON.stringify(article) }))
            const updateFetch = await Promise.allSettled(updateFetchObj)
            const failedFetch = updateFetch.filter((fetch) => fetch.status === 'rejected')
            if (failedFetch.length > 0) {
                toast({
                    title: 'Failed to update articles',
                    description: `Some articles failed to update. Please try again.`,
                    variant: 'destructive',
                })
            }

            setSelectedArticles([])

            await Promise.all([
                refetch(),
                fetch('/api/revalidate/articles', { method: 'POST' }),
                fetch('/api/revalidate/article', { method: 'POST' }),
                fetch('/api/revalidate/articlelist', { method: 'POST' }),
            ])
            return
        },
    })

    const updateArticles = (modifications: 'isComment' | 'isHide' | 'isNotice') => {
        if (selectedArticles.length === 0) {
            toast({
                title: 'No article selected',
                description: 'Please select at least one article to update.',
                variant: 'destructive',
            })
            return
        }

        const updatedArticles = selectedArticles.map((article) => ({
            ...article,
            [modifications]: !article[modifications],
        }))

        updateArticleStatus(updatedArticles)
    }

    return (
        <div className='flex flex-col size-full gap-2'>
            <h1 className='text-2xl'>Article List</h1>

            <section className='flex justify-end gap-2'>
                <Button variant={'outline'} size={'sm'} onClick={() => updateArticles('isHide')}>
                    Toggle Hide Selected Article
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={() => updateArticles('isNotice')}>
                    Toggle Article to Notice
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={() => updateArticles('isComment')}>
                    Toggle Disable Comment
                </Button>
            </section>

            <div className='border rounded-sm'>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-10'></TableHead>
                            <TableHead>ID</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Public</TableHead>
                            <TableHead>Notice</TableHead>
                            <TableHead>Comment</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articlesData?.posts.map((article) => (
                            <TableRow key={article.postId}>
                                <TableCell>
                                    <Checkbox
                                        checked={selectedArticles.includes(article)}
                                        onCheckedChange={(checked) => {
                                            if (checked) {
                                                setSelectedArticles((prev) => [...prev, article])
                                            } else {
                                                setSelectedArticles((prev) => prev.filter((a) => a.postId !== article.postId))
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{article.postId}</TableCell>
                                <TableCell>{categories?.find((category) => category.categoryId === article.categoryId)?.category}</TableCell>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{article.isHide ? 'Hidden' : 'Public'}</TableCell>
                                <TableCell>{article.isNotice ? 'Notice' : 'Normal'}</TableCell>
                                <TableCell>{article.isComment ? 'Enabled' : 'Disabled'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                callbackFn={setPage}
                page={page}
                next={articlesData?.pagination?.next || false}
                prev={articlesData?.pagination?.prev || false}
                totalPage={articlesData?.pagination?.totalPage || 0}
            />
        </div>
    )
}
