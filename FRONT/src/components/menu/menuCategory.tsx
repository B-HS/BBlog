import { cn } from '@/lib/utils'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import Flex from '../flex'

type MenuCategoryProps = {
    className?: string
    title: string
    count: number
} & HTMLAttributes<HTMLElement>

const MenuCategory = ({ className, title, count }: MenuCategoryProps) => {
    const isActivated = true
    return (
        <Link href={`/${title.toLowerCase()}`}>
            <Flex
                className={cn('gap-1 items-baseline cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all rounded', className)}
            >
                <span className={`text-primary ${isActivated ? 'font-bold' : ''}`}>{title}</span>
                <span className='opacity-50 text-xs'>({count})</span>
            </Flex>
        </Link>
    )
}

export default MenuCategory
