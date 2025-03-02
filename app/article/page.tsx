'use client'

import { ResponseArticleList } from '@entities/article'
import { Category } from '@entities/category'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge } from '@shared/ui/badge'
import { Input } from '@shared/ui/input'
import { Skeleton } from '@shared/ui/skeleton'
import { cn } from '@shared/utils'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ArticleList } from '@widgets/article'
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'

const SkeletonLoader = ({ count, className, isFlex }: { count: number; className: string; isFlex?: boolean }) => (
    <section className={cn(isFlex ? 'flex gap-2' : 'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3')}>
        {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} className={className} />
        ))}
    </section>
)

const ArticleListPage = () => {
    const [keywords, setKeywords] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
    const observerRef = useRef<HTMLDivElement | null>(null)

    const fetchCategories = async () => {
        const res = await fetch('/api/category')
        const { categories } = (await res.json()) as unknown as { categories: Category[] }
        return categories
    }

    const fetchArticles = async ({ pageParam = 1 }) => {
        const query = selectedCategory ? `categoryId=${selectedCategory.categoryId}&page=${pageParam}` : `page=${pageParam}`
        const withKeyword = keywords ? `&keywords=${keywords}` : ''
        const res = await fetch(`/api/article?${query}${withKeyword}`)
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
        refetch,
    } = useInfiniteQuery({
        queryKey: ['articles', selectedCategory, keywords],
        queryFn: fetchArticles,
        getNextPageParam: (lastPage) => (lastPage.nextPage ? lastPage.nextPage : null),
        enabled: Boolean(categories),
        initialPageParam: 1,
    })

    const handleCategorySelect = useCallback((category: Category | null) => {
        setSelectedCategory(category)
    }, [])

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && fetchNextPage()
            },
            { threshold: 1.0 },
        )

        observerRef.current && observer.observe(observerRef.current)

        return () => {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observerRef.current && observer.unobserve(observerRef.current)
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <section className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-3 p-2'>
                <p className='font-bold text-2xl'>Articles</p>
                <section className='flex gap-2 overflow-scroll'>
                    {isCategoryLoading ? (
                        <SkeletonLoader count={5} className='h-[22px] w-10' isFlex />
                    ) : (
                        <Fragment>
                            <Badge
                                onClick={() => handleCategorySelect(null)}
                                className='rounded-sm cursor-pointer'
                                variant={!selectedCategory?.categoryId ? 'default' : 'outline'}>
                                All
                            </Badge>
                            {categories?.map((category) => (
                                <Badge
                                    onClick={() => handleCategorySelect(category)}
                                    className={cn('rounded-sm cursor-pointer', category.isHide && 'opacity-20')}
                                    key={category.categoryId}
                                    variant={selectedCategory?.categoryId === category.categoryId ? 'default' : 'outline'}>
                                    {category.category}
                                </Badge>
                            ))}
                        </Fragment>
                    )}
                </section>
                <section className='relative flex items-center'>
                    <MagnifyingGlassIcon className='size-3.5 absolute top-1/2 left-2.5 -translate-y-1/2' />
                    <Input
                        placeholder='Enter keywords to search'
                        className='h-8 pl-7'
                        value={keywords}
                        onChange={(e) => setKeywords(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && refetch()}
                    />
                </section>
                {(isArticleLoading || isCategoryLoading) && <SkeletonLoader count={6} className=' h-[103.5px]' />}
                {!isArticleLoading && <ArticleList articles={articlesData?.pages.flatMap((page) => page.posts)} category={categories} />}
                <div ref={observerRef} className='w-full h-10' />
                {isFetchingNextPage && <p className='text-secondary'>Loading ...</p>}
            </section>
        </section>
    )
}

export default ArticleListPage
