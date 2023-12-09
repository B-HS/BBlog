import { cn } from '@/lib/utils'
import Link from 'next/link'
import { HTMLAttributes } from 'react'
import Flex from '../flex'

type menuElementProps = {
    className?: string
    title: string
    count: number
} & HTMLAttributes<HTMLElement>

const MenuElement = ({ className, title, count = 0 }: menuElementProps) => {
    const isActivated = false
    return (
        <Link href={`/${title.toLowerCase()}`}>
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
        </Link>
    )
}

export default MenuElement
