import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/tooltip'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Button } from '../ui/button'

export const Github = ({
    variant,
    noTooltip,
}: {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
    noTooltip?: boolean
}) => {
    return noTooltip ? (
        <Icon variant={variant} />
    ) : (
        <TooltipProvider>
            <Tooltip delayDuration={0}>
                <TooltipTrigger className='leading-normal'>
                    <Icon variant={variant} />
                </TooltipTrigger>
                <TooltipContent>Github</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const Icon = ({ variant }: { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' }) => {
    return (
        <Button variant={variant || 'ghost'} size={'icon'} asChild aria-label='Github'>
            <Link className='p-2' href={'https://github.com/B-HS'}>
                <GitHubLogoIcon className='h-6 w-6' />
            </Link>
        </Button>
    )
}
