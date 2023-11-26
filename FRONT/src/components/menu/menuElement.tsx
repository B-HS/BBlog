import { cn } from '@/lib/utils'
import { HTMLAttributes } from 'react'
import Flex from '../flex'

type menuElementProps = {
    className?: string
    title: string
    count: string | number
} & HTMLAttributes<HTMLElement>

const menuElement = ({ className, title, count }: menuElementProps) => {
    const isActivated = false
    return (
        <Flex className={cn(`ml-3 gap-1 items-baseline ${!isActivated ? 'opacity-50' : ''}`, className)}>
            <span className='text-primary'> - {title}</span>
            <span className='text-xs'>({count})</span>
        </Flex>
    )
}

export default menuElement
