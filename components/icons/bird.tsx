import { BirdIcon } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { ReactNode } from 'react'

const Bird = ({ isTooltip, visitCnt, children }: { isTooltip?: boolean; visitCnt?: string | number; children?: ReactNode }) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='cursor-default'>
                    <BirdIcon className='animate-pulse h-6 w-6 hover:animate-none' aria-label='Tools' />
                </TooltipTrigger>
                {visitCnt && (
                    <TooltipContent>
                        <span className='text-xs'>Today : {visitCnt}</span>
                    </TooltipContent>
                )}
                {isTooltip && !visitCnt && children}
            </Tooltip>
        </TooltipProvider>
    )
}

export default Bird
