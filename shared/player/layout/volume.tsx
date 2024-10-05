import { TooltipContent } from '@radix-ui/react-tooltip'
import { Button } from '@shared/ui/button'
import { Tooltip, TooltipTrigger } from '@shared/ui/tooltip'
import { cn } from '@shared/utils'
import { Volume1Icon, Volume2Icon, VolumeXIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'
import { useVideoControl } from '../hooks'
import { usePlayerStore } from '../player-store'

export const Volume = ({ className }: { className?: ClassNameValue }) => {
    const { muteToggle } = useVideoControl()
    const { state: playerOptions, dispatch: setPlayerOptions } = usePlayerStore()

    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <Button size={'icon'} variant={'ghost'} className={cn('rounded-none', className)} onClick={muteToggle}>
                    {playerOptions.muted || playerOptions.volume === 0 ? (
                        <VolumeXIcon />
                    ) : playerOptions.volume > 0.5 ? (
                        <Volume2Icon />
                    ) : playerOptions.volume > 0 ? (
                        <Volume1Icon />
                    ) : null}
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <section className='-rotate-90 -translate-y-14 p-2 bg-background'>
                    <input
                        className='w-full h-2 bg-foreground/30 rounded-lg cursor-pointer accent-foreground'
                        type='range'
                        min='0'
                        max='1'
                        step='0.05'
                        value={playerOptions.volume}
                        onChange={(e) => setPlayerOptions({ type: 'SET_PLAYER_OPTIONS', payload: { volume: parseFloat(e.target.value) } })}
                    />
                </section>
            </TooltipContent>
        </Tooltip>
    )
}
