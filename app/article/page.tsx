'use client'

import { Article } from '@entities/article'
import { Category } from '@entities/category'
import { Badge } from '@shared/ui/badge'
import { Button } from '@shared/ui/button'
import { Skeleton } from '@shared/ui/skeleton'
import { cn } from '@shared/utils'
import { ArticleList } from '@widgets/article'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

const useArticles = (selectedCategory: Category | null, page: number, isCategoryLoaded: boolean) => {
    const [articles, setArticles] = useState<Article[]>([])
    const [hasNext, setHasNext] = useState(true)
    const [isArticleLoaded, setIsArticleLoaded] = useState(false)
    const isFirstFetch = useRef(true) // This will track if it's the first load

    useEffect(() => {
        if (isFirstFetch.current) {
            isFirstFetch.current = false // Prevents further fetches on initial load
            return
        }

        const queryBuilder = new URLSearchParams()
        queryBuilder.append('page', page.toString())
        if (selectedCategory) {
            queryBuilder.append('categoryId', selectedCategory.categoryId.toString())
        }

        fetch(`/api/article?${queryBuilder.toString()}`)
            .then((res) => res.json())
            .then((data) => {
                const { posts } = data as { posts: Article[] }
                if (posts.length > 0) {
                    setArticles((prev) => [...prev, ...posts])
                } else {
                    setHasNext(false)
                }
            })
            .finally(() => setIsArticleLoaded(true))
    }, [page, selectedCategory])

    return { articles, hasNext, isArticleLoaded, setArticles, setIsArticleLoaded }
}

const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isCategoryLoaded, setIsCategoryLoaded] = useState(false)

    useEffect(() => {
        fetch('/api/category')
            .then((res) => res.json())
            .then((data) => {
                const { categories } = data
                setCategories(categories || [])
            })
            .finally(() => setIsCategoryLoaded(true))
    }, [])

    return { categories, isCategoryLoaded }
}

const SkeletonLoader = ({ count, className, isFlex }: { count: number; className: string; isFlex?: boolean }) => (
    <section className={cn(isFlex ? 'flex gap-2' : 'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3')}>
        {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} className={className} />
        ))}
    </section>
)

const ArticleListPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const [page, setPage] = useState(1)

    const { categories, isCategoryLoaded } = useCategories()
    const { articles, hasNext, isArticleLoaded, setArticles, setIsArticleLoaded } = useArticles(selectedCategory, page, isCategoryLoaded)

    const handleCategorySelect = useCallback((category: Category | null) => {
        setIsArticleLoaded(false)
        setArticles([])
        setPage(1)
        setSelectedCategory(category)
    }, [])

    return (
        <section className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-2 p-2'>
                <p className='font-bold text-2xl'>Articles</p>
                <section className='flex gap-2 overflow-scroll'>
                    {!isCategoryLoaded ? (
                        <SkeletonLoader count={5} className='h-[22px] w-10' isFlex />
                    ) : (
                        <Fragment>
                            <Badge
                                onClick={() => handleCategorySelect(null)}
                                className='rounded-sm'
                                variant={!selectedCategory?.categoryId ? 'default' : 'outline'}>
                                All
                            </Badge>
                            {categories.map((category) => (
                                <Badge
                                    onClick={() => handleCategorySelect(category)}
                                    className='rounded-sm'
                                    key={category.categoryId}
                                    variant={selectedCategory?.categoryId === category.categoryId ? 'default' : 'outline'}>
                                    {category.category}
                                </Badge>
                            ))}
                        </Fragment>
                    )}
                </section>

                {!isArticleLoaded ? (
                    <SkeletonLoader count={6} className='sm:w-90 h-[119px]' />
                ) : (
                    <ArticleList articles={articles} category={categories} />
                )}

                <Button
                    onClick={() => hasNext && setPage((page) => page + 1)}
                    variant={hasNext ? 'outline' : 'ghost'}
                    className={cn(!hasNext && 'hover:bg-background cursor-default')}>
                    {hasNext ? 'Load more' : 'No more articles.'}
                </Button>
            </section>
        </section>
    )
}

export default ArticleListPage
