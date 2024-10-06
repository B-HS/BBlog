import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/tooltip'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../ui/button'

export const Misskey = ({ variant }: { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button variant={variant || 'ghost'} size={'icon'} asChild aria-label='Misskey'>
                        <Link href={'https://mi.gumyo.net/'}>
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
