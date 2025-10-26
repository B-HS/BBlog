'use client'

import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { Input } from '@ui/input'
import { SearchIcon, XIcon } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useState, KeyboardEvent, Fragment } from 'react'

interface ArticleFilterProps {
    categoryList: { categoryId: number; category: string }[]
}

export const ArticleFilter: FC<ArticleFilterProps> = ({ categoryList }) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [keyword, setKeyword] = useState(searchParams.get('keyword') || '')
    const currentCategoryId = searchParams.get('categoryId')

    const handleCategoryClick = (categoryId: number) => {
        const params = new URLSearchParams(searchParams)
        if (currentCategoryId === String(categoryId)) {
            params.delete('categoryId')
        } else {
            params.set('categoryId', String(categoryId))
        }
        params.delete('offset')
        router.push(`/article?${params.toString()}`)
    }

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams)
        if (keyword.trim()) {
            params.set('keyword', keyword.trim())
        } else {
            params.delete('keyword')
        }
        params.delete('offset')
        router.push(`/article?${params.toString()}`)
    }

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    }

    return (
        <div className='flex justify-between items-center gap-3.5'>
            <nav className='flex gap-2 overflow-x-auto min-w-fit' aria-label='카테고리 필터'>
                {categoryList.map((category) => (
                    <Badge
                        key={category.categoryId}
                        className='rounded cursor-pointer'
                        variant={currentCategoryId === String(category.categoryId) ? 'default' : 'secondary'}
                        onClick={() => handleCategoryClick(category.categoryId)}>
                        {category.category}
                    </Badge>
                ))}
            </nav>
            <form
                className='flex gap-2 justify-end'
                role='search'
                onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch()
                }}>
                <div className='relative'>
                    <Input
                        className='pl-8 focus-visible:ring-0 focus-visible:outline-none'
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        aria-label='게시글 검색'
                    />
                    <SearchIcon className='size-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground' />
                </div>
                <Button variant='outline' type='submit'>
                    검색
                </Button>
            </form>
        </div>
    )
}
