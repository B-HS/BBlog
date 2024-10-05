import { Button } from '@shared/ui/button'
import { Separator } from '@shared/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui/tooltip'
import { cn } from '@shared/utils'
import { Headphones } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { useVideoControl } from '../hooks'
import { useExtraOptionsStore, usePlayerStore } from '../player-store'

export const Audio = ({ className }: { className?: ClassNameValue }) => {
    const [current, setCurrent] = useState<string>('')
    const { state: extraOptions } = useExtraOptionsStore()
    const { state: playerOptions } = usePlayerStore()
    const { currentAudioTrack, setAudioTrack } = useVideoControl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const audio = useMemo(() => currentAudioTrack(), [playerOptions.playing])
    return (
        <Tooltip delayDuration={0}>
            {extraOptions.audios.length !== 0 && (
                <TooltipTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} className={cn('rounded-none', className)}>
                        <Headphones />
                    </Button>
                </TooltipTrigger>
            )}
            <TooltipContent className='flex flex-col p-0' side='top'>
                {audio !== undefined && extraOptions.audios.length !== 0 && (
                    <Fragment>
                        <span className='px-2 py-1 cursor-pointer'>{current || extraOptions.audios.find((ele) => ele.index === audio)?.name}</span>
                        <Separator className='my-0' />
                    </Fragment>
                )}

                <section className='flex flex-col'>
                    {extraOptions.audios.map((audio, idx) => (
                        <span
                            className='px-2 py-1 cursor-pointer'
                            key={idx}
                            onClick={() => {
                                setCurrent(audio.name)
                                setAudioTrack(idx)
                            }}>
                            {audio.name}
                        </span>
                    ))}
                    {extraOptions.audios.length === 0 && <span className='px-2 py-1 cursor-pointer'>No audios</span>}
                </section>
            </TooltipContent>
        </Tooltip>
    )
}
