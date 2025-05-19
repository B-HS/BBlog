import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/tooltip'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export const Misskey = ({
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
                    <Button variant={variant || 'ghost'} size={'icon'} asChild aria-label='Icon'>
                        <Link href={'/misskey'} prefetch={false}>
                            <Image
                                className='grayscale hover:grayscale-0'
                                src={'https://img.gumyo.net/misskeyicon.png'}
                                width={24}
                                height={24}
                                alt='misskeyicon'
                            />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Misskey</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

const Icon = ({ variant }: { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' }) => {
    return (
        <Button variant={variant || 'ghost'} size={'icon'} asChild aria-label='Misskey' type='submit'>
            <Link href={'/misskey'} prefetch={false}>
                <Image
                    className='grayscale hover:grayscale-0'
                    src={'https://img.gumyo.net/misskeyicon.png'}
                    width={24}
                    height={24}
                    alt='misskeyicon'
                />
            </Link>
        </Button>
    )
}
