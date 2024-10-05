import { Button } from '@shared/ui/button'
import { Separator } from '@shared/ui/separator'
import { Tooltip, TooltipContent, TooltipTrigger } from '@shared/ui/tooltip'
import { cn } from '@shared/utils'
import { Languages } from 'lucide-react'
import { Fragment, useMemo, useState } from 'react'
import { ClassNameValue } from 'tailwind-merge'
import { useVideoControl } from '../hooks'
import { useExtraOptionsStore, usePlayerStore } from '../player-store'

export const Language = ({ className }: { className?: ClassNameValue }) => {
    const [current, setCurrent] = useState<string>('')
    const { state: playerOptions } = usePlayerStore()
    const { state: extraOptions } = useExtraOptionsStore()
    const { currentSubtitle, setSubtitle } = useVideoControl()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const language = useMemo(() => currentSubtitle(), [playerOptions.playing])

    return (
        <Tooltip delayDuration={0}>
            {extraOptions.languages.length !== 0 && (
                <TooltipTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} className={cn('rounded-none', className)}>
                        <Languages />
                    </Button>
                </TooltipTrigger>
            )}
            <TooltipContent className='flex flex-col p-0' side='top'>
                {language?.label && (
                    <Fragment>
                        <span className='px-2 py-1 cursor-pointer'>{current || language?.label}</span>
                        <Separator className='my-0' />
                    </Fragment>
                )}

                <section className='flex flex-col'>
                    {extraOptions.languages.map((language, idx) => (
                        <span
                            className='px-2 py-1 cursor-pointer'
                            key={idx}
                            onClick={() => {
                                setCurrent(language.name)
                                setSubtitle(idx)
                            }}>
                            {language.name}
                        </span>
                    ))}
                    {extraOptions.languages.length === 0 && <span className='px-2 py-1 cursor-pointer'>No subtitles</span>}
                </section>
            </TooltipContent>
        </Tooltip>
    )
}
