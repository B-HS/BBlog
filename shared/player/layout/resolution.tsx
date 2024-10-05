import { Button } from '@shared/ui/button'
import { Separator } from '@shared/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui/tooltip'
import { cn } from '@shared/utils'
import { SlidersVertical } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { useVideoControl } from '../hooks'
import { resolutionMapper, useExtraOptionsStore, usePlayerStore } from '../player-store'

export const Resolution = ({ className }: { className?: ClassNameValue }) => {
    const [current, setCurrent] = useState<string>('')
    const { state: playerOptions } = usePlayerStore()
    const { state: extraOptions } = useExtraOptionsStore()
    const { currentQuality, setQuality } = useVideoControl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const quality = useMemo(() => resolutionMapper(extraOptions.qualities[currentQuality()]).height, [playerOptions.playing])
    return (
        <Tooltip delayDuration={0}>
            {extraOptions.qualities.length !== 0 && (
                <TooltipTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} className={cn('rounded-none', className)}>
                        <SlidersVertical />
                    </Button>
                </TooltipTrigger>
            )}
            <TooltipContent className='flex flex-col p-0' side='top'>
                {quality !== '0' && (
                    <Fragment>
                        <span className='px-2 py-1 cursor-pointer'>{current || quality}p</span>
                        <Separator />
                    </Fragment>
                )}
                <section className='flex flex-col'>
                    {extraOptions.qualities.map((quality, idx) => (
                        <span
                            className='px-2 py-1 cursor-pointer'
                            key={idx}
                            onClick={() => {
                                setCurrent(resolutionMapper(quality).height)
                                setQuality(idx)
                            }}>
                            {resolutionMapper(quality).height}p
                        </span>
                    ))}
                    {extraOptions.qualities.length === 0 && <span className='px-2 py-1'>No quality options</span>}
                </section>
            </TooltipContent>
        </Tooltip>
    )
}
