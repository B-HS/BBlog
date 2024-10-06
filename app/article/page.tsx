'use client'

import { ResponseArticleList } from '@entities/article'
import { Category } from '@entities/category'
import { Badge } from '@shared/ui/badge'
import { Button } from '@shared/ui/button'
import { Skeleton } from '@shared/ui/skeleton'
import { cn } from '@shared/utils'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ArticleList } from '@widgets/article'
import { Fragment, useCallback, useState } from 'react'

const SkeletonLoader = ({ count, className, isFlex }: { count: number; className: string; isFlex?: boolean }) => (
    <section className={cn(isFlex ? 'flex gap-2' : 'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3')}>
        {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} className={className} />
        ))}
    </section>
)

const ArticleListPage = () => {
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

    const fetchCategories = async () => {
        const res = await fetch('/api/category')
        const { categories } = (await res.json()) as unknown as { categories: Category[] }
        return categories
    }

    const fetchArticles = async ({ pageParam = 1 }) => {
        const query = selectedCategory ? `categoryId=${selectedCategory.categoryId}&page=${pageParam}` : `page=${pageParam}`
        const res = await fetch(`/api/article?${query}`)
        const result = (await res.json()) as ResponseArticleList
        return {
            posts: (await result).posts,
            nextPage: (await result).posts.length > 0 ? pageParam + 1 : undefined,
        }
    }

    const { data: categories, isLoading: isCategoryLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    })

    const {
        data: articlesData,
        isLoading: isArticleLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['articles', selectedCategory],
        queryFn: fetchArticles,
        getNextPageParam: (lastPage) => (lastPage.nextPage ? lastPage.nextPage : null),
        enabled: Boolean(categories),
        initialPageParam: 1,
    })

    const handleCategorySelect = useCallback((category: Category | null) => {
        setSelectedCategory(category)
    }, [])

    return (
        <section className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-2 p-2'>
                <p className='font-bold text-2xl'>Articles</p>
                <section className='flex gap-2 overflow-scroll'>
                    {isCategoryLoading ? (
                        <SkeletonLoader count={5} className='h-[22px] w-10' isFlex />
                    ) : (
                        <Fragment>
                            <Badge
                                onClick={() => handleCategorySelect(null)}
                                className='rounded-sm'
                                variant={!selectedCategory?.categoryId ? 'default' : 'outline'}>
                                All
                            </Badge>
                            {categories?.map((category) => (
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

                {isArticleLoading ? (
                    <SkeletonLoader count={6} className='sm:w-90 h-[119px]' />
                ) : (
                    <ArticleList articles={articlesData?.pages.flatMap((page) => page.posts)} category={categories} />
                )}

                <Button
                    onClick={() => fetchNextPage()}
                    variant={hasNextPage ? 'outline' : 'ghost'}
                    disabled={!hasNextPage || isFetchingNextPage}
                    className={cn(!hasNextPage && 'hover:bg-background cursor-default')}>
                    {isFetchingNextPage ? 'Loading...' : hasNextPage ? 'Load more' : 'No more articles.'}
                </Button>
            </section>
        </section>
    )
}

export default ArticleListPage
