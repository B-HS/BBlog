import { Article, ResponseArticleList } from '@entities/article'
import { Category } from '@entities/category'
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

    const fetchCategories = async () => {
        const res = await fetch('/api/category')
        const { categories } = (await res.json()) as { categories: Category[] }
        return categories
    }

    const fetchArticles = async () => {
        const res = await fetch(`/api/article?all=false&limit=${LIMIT_PER_PAGE}&page=${page}`)
        const result = (await res.json()) as ResponseArticleList
        return result
    }
    const { data: categories } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const { data: articlesData, refetch } = useQuery({
        queryKey: ['articles', page],
        queryFn: fetchArticles,
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
            refetch()
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
        <section className='flex flex-col size-full gap-2'>
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

            <section className='border rounded-sm'>
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
            </section>
            <Pagination
                callbackFn={setPage}
                page={page}
                next={articlesData?.pagination?.next || false}
                prev={articlesData?.pagination?.prev || false}
                totalPage={articlesData?.pagination?.totalPage || 0}
            />
        </section>
    )
}
