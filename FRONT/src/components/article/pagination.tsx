import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'

const Pagination = ({ page, totalPage, setPage }: { page: number; totalPage: number; setPage: Function }) => {
    const range = 2
    const start = Math.max(1, page - range)
    const end = Math.min(totalPage, page + range)

    return (
        <>
            {page !== 1 && start - 1 > 0 && (
                <Button variant='ghost' size={'icon'} onClick={() => setPage(start - 1)}>
                    <ChevronsLeftIcon className='w-3.5 cursor-pointer' />
                </Button>
            )}
            {page !== 1 && (
                <Button variant='ghost' size={'icon'} onClick={() => setPage(page - 1)}>
                    <ChevronLeftIcon className='w-3.5 cursor-pointer' />
                </Button>
            )}
            {Array.from({ length: end - start + 1 }).map((_, idx) => (
                <Badge
                    onClick={() => setPage(start + idx)}
                    className='rounded cursor-pointer hover:bg-secondary'
                    key={start + idx}
                    variant={start + idx === page ? 'secondary' : 'outline'}
                >
                    {start + idx}
                </Badge>
            ))}
            {page !== totalPage && (
                <Button variant='ghost' size={'icon'} onClick={() => setPage(page + 1)}>
                    <ChevronRightIcon className='w-3.5 cursor-pointer' />
                </Button>
            )}
            {page !== totalPage && totalPage - end > 0 && (
                <Button variant='ghost' size={'icon'} onClick={() => setPage(end + 1)}>
                    <ChevronsRightIcon className='w-3.5 cursor-pointer' />
                </Button>
            )}
        </>
    )
}

export default Pagination
