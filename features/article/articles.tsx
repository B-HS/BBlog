'use client'

import { articleQueries } from '@entities/article'
import { Category, categoryQueries } from '@entities/category'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Badge } from '@shared/ui/badge'
import { Input } from '@shared/ui/input'
import { Skeleton } from '@shared/ui/skeleton'
import { cn } from '@shared/utils'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { ArticleList } from '@widgets/article'
import { Bird } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react'

const SkeletonLoader = ({ count, className, isFlex }: { count: number; className: string; isFlex?: boolean }) => (
    <section className={cn(isFlex ? 'flex gap-2' : 'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3')}>
        {Array.from({ length: count }).map((_, i) => (
            <Skeleton key={i} className={className} />
        ))}
    </section>
)

export const Articles = ({ initialCategoryId, initialKeywords }: { initialCategoryId?: number; initialKeywords?: string }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [keywords, setKeywords] = useState(initialKeywords || '')
    const observerRef = useRef<HTMLDivElement | null>(null)

    const { data: categories, isLoading: isCategoryLoading } = useQuery(categoryQueries.all())

    const filters = useMemo(() => {
        const result: { categoryId?: number; keywords?: string } = {}
        if (initialCategoryId) result.categoryId = initialCategoryId
        if (keywords) result.keywords = keywords
        return result
    }, [initialCategoryId, keywords])

    const {
        data: articlesData,
        isLoading: isArticleLoading,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        refetch,
    } = useInfiniteQuery(articleQueries.list(filters))

    const handleCategorySelect = useCallback(
        (category: Category | null) => {
            const params = new URLSearchParams(searchParams.toString())
            if (category?.categoryId) {
                params.set('categoryId', String(category.categoryId))
            } else {
                params.delete('categoryId')
            }
            if (keywords) {
                params.set('keywords', keywords)
            } else {
                params.delete('keywords')
            }
            router.replace(`/article?${params.toString()}`, { scroll: false })
        },
        [keywords, router, searchParams],
    )

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries[0].isIntersecting && hasNextPage && !isFetchingNextPage && fetchNextPage()
            },
            { threshold: 1.0 },
        )

        observerRef.current && observer.observe(observerRef.current)

        return () => {
            observerRef.current && observer.unobserve(observerRef.current)
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])

    return (
        <div className='size-full flex flex-col gap-10 p-2'>
            <section className='flex flex-col gap-3 p-2'>
                <h1 className='font-bold text-2xl'>Articles</h1>
                <section className='flex gap-2 overflow-scroll'>
                    {isCategoryLoading ? (
                        <SkeletonLoader count={5} className='h-[22px] w-10' isFlex />
                    ) : (
                        <Fragment>
                            <Badge
                                onClick={() => handleCategorySelect(null)}
                                className='rounded-sm cursor-pointer'
                                variant={!initialCategoryId ? 'default' : 'outline'}>
                                All
                            </Badge>
                            {categories?.map((category) => (
                                <Badge
                                    onClick={() => handleCategorySelect(category)}
                                    className={cn('rounded-sm cursor-pointer', category.isHide && 'opacity-20')}
                                    key={category.categoryId}
                                    variant={initialCategoryId === category.categoryId ? 'default' : 'outline'}>
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
                {isFetchingNextPage && (
                    <div className='w-full flex justify-center items-center'>
                        <Bird className='animate-bounce text-secondary duration-75' />
                    </div>
                )}
            </section>
        </div>
    )
}
