import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@shared/ui/tooltip'
import { ScrollTextIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../ui/button'

export const Resume = ({ variant }: { variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger>
                    <Button variant={variant || 'ghost'} size={'icon'} asChild aria-label='Resume'>
                        <Link className='p-2' href={'https://resume.gumyo.net'}>
                            <ScrollTextIcon className='h-6 w-6' />
                        </Link>
                    </Button>
                </TooltipTrigger>
                <TooltipContent>Resume(KR)</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
