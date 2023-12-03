import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import Flex from '../flex'

type MenuCategoryProps = {
    className?: string
    title: string
} & HTMLAttributes<HTMLElement>

const MenuCategory = ({ className, title }: MenuCategoryProps) => {
    const isActivated = true
    const count = 0
    return (
        <Flex className={cn('gap-1 items-baseline cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all rounded', className)}>
            <span className={`text-primary ${isActivated ? 'font-bold' : ''}`}>{title}</span>
            <span className=''>({count})</span>
        </Flex>
    )
}

export default MenuCategory
