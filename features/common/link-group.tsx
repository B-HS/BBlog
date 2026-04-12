import { buttonVariants } from '@ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/tooltip'
import Link from 'next/link'
import { FC } from 'react'
import type { LinkItem } from '@lib/constants'

type LinkGroupProps = {
    title: string
    links: LinkItem[]
}

export const LinkGroup: FC<LinkGroupProps> = ({ title, links }) => {
    return (
        <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-2xl'>{title}</h2>
            <div className='flex gap-2 flex-wrap'>
                {links.map((link) => (
                    <Tooltip key={link.url}>
                        <TooltipTrigger asChild>
                            <Link
                                href={link.url}
                                className={buttonVariants({ variant: 'outline', size: 'icon-lg', className: '[&>svg]:size-5.5!' })}>
                                <link.icon className={link.iconClassName} />
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>{link.label}</TooltipContent>
                    </Tooltip>
                ))}
            </div>
        </div>
    )
}
