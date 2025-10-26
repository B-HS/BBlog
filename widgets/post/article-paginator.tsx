'use client'

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@ui/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC } from 'react'

interface ArticlePaginatorProps {
    currentPage: number
    totalPages: number
}

export const ArticlePaginator: FC<ArticlePaginatorProps> = ({ currentPage, totalPages }) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            const params = new URLSearchParams(searchParams)
            const offset = (page - 1) * 12
            if (offset > 0) {
                params.set('offset', String(offset))
            } else {
                params.delete('offset')
            }
            router.push(`/article?${params.toString()}`)
        }
    }

    if (totalPages <= 1) {
        return null
    }

    return (
        <Pagination className='py-2.5'>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious
                        size='sm'
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => {
                    const pageNumber = index + 1
                    if (pageNumber === 1 || pageNumber === totalPages || (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)) {
                        return (
                            <PaginationItem key={pageNumber}>
                                <PaginationLink
                                    size='sm'
                                    onClick={() => handlePageChange(pageNumber)}
                                    isActive={pageNumber === currentPage}
                                    className='cursor-pointer'>
                                    {pageNumber}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    }
                    return null
                })}

                <PaginationItem>
                    <PaginationNext
                        size='sm'
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}
