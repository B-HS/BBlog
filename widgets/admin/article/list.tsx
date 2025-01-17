import { ResponseArticleList } from '@entities/article'
import { Category } from '@entities/category'
import { Button } from '@shared/ui/button'
import { Checkbox } from '@shared/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@shared/ui/table'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const ArticleListManagement = () => {
    const [page, setPage] = useState(1)
    const [keywords, setKeywords] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    const fetchCategories = async () => {
        const res = await fetch('/api/category')
        const { categories } = (await res.json()) as unknown as { categories: Category[] }
        return categories
    }

    const fetchArticles = async () => {
        const query = selectedCategory ? `categoryId=${selectedCategory.categoryId}&page=${page}` : `page=${page}`
        const withKeyword = keywords ? `&keywords=${keywords}` : ''
        const res = await fetch(`/api/article?${query}${withKeyword}`)
        const result = (await res.json()) as ResponseArticleList
        return {
            posts: (await result).posts,
            nextPage: (await result).posts.length > 0 ? page + 1 : undefined,
        }
    }
    const { data: categories, isLoading: isCategoryLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const { data: articlesData, isLoading: isArticleLoading } = useQuery({
        queryKey: ['articles', selectedCategory, keywords],
        queryFn: fetchArticles,
        enabled: Boolean(categories),
    })

    const setHide = () => {}
    const setNotice = () => {}
    const setComment = () => {}

    return (
        <section className='flex flex-col size-full gap-2'>
            <h1 className='text-2xl'>Article List</h1>

            <section className='flex justify-end gap-2'>
                <Button variant={'outline'} size={'sm'} onClick={setHide}>
                    Hide Selected Article
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={setNotice}>
                    Set Article to Notice
                </Button>
                <Button variant={'outline'} size={'sm'} onClick={setComment}>
                    Disable comment
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
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {articlesData?.posts.map((article) => (
                            <TableRow key={article.postId}>
                                <TableCell>
                                    <Checkbox />
                                </TableCell>
                                <TableCell>{article.postId}</TableCell>
                                <TableCell>{categories?.find((category) => category.categoryId === article.categoryId)?.category}</TableCell>
                                <TableCell>{article.title}</TableCell>
                                <TableCell>{article.isHide ? 'Hidden' : 'Public'}</TableCell>
                                <TableCell>{article.isNotice ? 'Notice' : 'Normal'}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </section>
        </section>
    )
}
