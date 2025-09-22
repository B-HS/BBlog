import {
    Pagination as PaginationComponent,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@shared/ui/pagination'
import { FC } from 'react'

type PaginationProps = {
    page: number
    totalPages: number
    className?: string
    onClick?: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({ page, totalPages, className, onClick }) => {
    const makeRange = (start: number, end: number) => Array.from({ length: end - start + 1 }, (_, i) => start + i)

    const getPageNumbers = () => {
        if (totalPages <= 10) return makeRange(1, totalPages)

        if (page <= 3) return makeRange(1, 5)
        if (page >= totalPages - 2) return makeRange(totalPages - 4, totalPages)

        return makeRange(page - 2, page + 2)
    }

    const showPrev = totalPages > 10 && page > 5
    const showNext = totalPages > 10 && page <= totalPages - 5

    return (
        <PaginationComponent className={className}>
            <PaginationContent>
                {showPrev && (
                    <PaginationItem>
                        <PaginationPrevious onClick={() => onClick?.(page - 1)} />
                    </PaginationItem>
                )}

                {getPageNumbers().map((pageNum) => (
                    <PaginationItem key={pageNum}>
                        <PaginationLink isActive={pageNum === page} onClick={() => onClick?.(pageNum)}>
                            {pageNum}
                        </PaginationLink>
                    </PaginationItem>
                ))}

                {showNext && (
                    <PaginationItem>
                        <PaginationNext onClick={() => onClick?.(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </PaginationComponent>
    )
}
