'use client'

import type { FC } from 'react'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@ui/pagination'

interface PaginatorProps {
    currentPage: number
    totalPages: number
    onPageChange: (page: number) => void
}

export const Paginator: FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    if (totalPages <= 1) {
        return null
    }

    return (
        <Pagination>
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
