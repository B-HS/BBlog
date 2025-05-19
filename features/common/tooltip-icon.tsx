import { Button } from '@shared/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/tooltip'
import Link from 'next/link'
import { ElementType } from 'react'

export const TooltipIcon = ({
    icon: Icon,
    variant,
    noTooltip,
    tooltipContent,
    linkUrl,
}: {
    icon: ElementType
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    noTooltip?: boolean
    tooltipContent?: string
    linkUrl: string
}) => {
    return noTooltip ? (
        <IconWrapper icon={Icon} variant={variant} linkUrl={linkUrl} />
    ) : (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger className='leading-normal'>
                    <IconWrapper icon={Icon} variant={variant} linkUrl={linkUrl} />
                </TooltipTrigger>
                <TooltipContent>{tooltipContent}</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const IconWrapper = ({
    icon: Icon,
    variant,
    linkUrl,
}: {
    icon: ElementType
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    linkUrl: string
}) => {
    return (
        <Button variant={variant || 'ghost'} size={'icon'} asChild aria-label='Icon'>
            <Link className='p-2' href={linkUrl} prefetch={false}>
                <Icon className='size-5' />
            </Link>
        </Button>
    )
}
