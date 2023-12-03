import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import Flex from '../flex'

type menuElementProps = {
    className?: string
    title: string
} & HTMLAttributes<HTMLElement>

const MenuElement = ({ className, title }: menuElementProps) => {
    const isActivated = false
    const count = 0
    return (
        <Flex
            className={cn(
                `pl-5 gap-1 items-baseline cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-all rounded 
                ${!isActivated ? 'opacity-50' : ''}
                hover:opacity-100
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
