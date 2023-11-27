import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import Flex from '../flex'

type menuElementProps = {
    className?: string
    title: string
    count: string | number
} & HTMLAttributes<HTMLElement>

const MenuElement = ({ className, title, count }: menuElementProps) => {
    const isActivated = false
    return (
        <Flex
            className={cn(
                `pl-5 gap-1 items-baseline cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all rounded 
                ${!isActivated ? 'opacity-50' : ''}
                `,
                className,
            )}
        >
            <span className='text-primary'> - {title}</span>
            <span className='text-xs'>({count})</span>
        </Flex>
    )
}

export default MenuElement
