import { Pagination as PaginationType } from '@entities/common'
import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Pagination as RawPagination,
} from '@shared/ui/pagination'

export const Pagination = ({
    next,
    page,
    prev,

    totalPage,
    callbackFn,
}: Pick<PaginationType, 'next' | 'page' | 'prev' | 'totalPage'> & { callbackFn: (num: number) => unknown }) => {
    return (
        <RawPagination>
            <PaginationContent>
                {prev && (
                    <PaginationItem>
                        <PaginationPrevious onClick={() => callbackFn(page - 1)} />
                    </PaginationItem>
                )}
                {Array.from({ length: totalPage || 1 }).map((_, idx) => (
                    <PaginationItem key={idx}>
                        <PaginationLink onClick={() => callbackFn(idx + 1)}>{idx + 1}</PaginationLink>
                    </PaginationItem>
                ))}

                {next && (
                    <PaginationItem>
                        <PaginationNext onClick={() => callbackFn(page + 1)} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </RawPagination>
    )
}
