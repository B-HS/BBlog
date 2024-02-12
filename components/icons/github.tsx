import { GitHubLogoIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Github = ({ variant }: { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='leading-normal'>
                    <Button variant={variant || 'ghost'} size={'icon'} asChild>
                        <Link className='p-2' href={'https://github.com/B-HS'}>
                            <GitHubLogoIcon className='h-6 w-6' />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Github</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}

export default Github
