import { Button } from '@/shared/ui'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip'

import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps, FC } from 'react'

interface IconButtonProps {
    variant?: ComponentProps<typeof Button>['variant']
    linkUrl: string
    tooltipContent: string
    icon?: React.ReactNode
    iconSrc?: string
}

export const IconButton: FC<IconButtonProps> = ({ variant = 'ghost', linkUrl, icon, iconSrc, tooltipContent }) => {
    const Icon = icon || <Image src={iconSrc || ''} alt={tooltipContent} width={24} height={24} />
    return (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger className='leading-normal'>
                    <Button variant={variant || 'ghost'} size={'icon'} asChild aria-label='Icon'>
                        <Link href={linkUrl} className='grayscale hover:grayscale-0'>
                            {Icon}
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>{tooltipContent}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
