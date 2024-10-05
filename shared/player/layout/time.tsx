import dayjs from 'dayjs'
import { useExtraOptionsStore } from '../player-store'

export const Time = () => {
    const { state: extraOptions } = useExtraOptionsStore()

    const playedSeconds = extraOptions.playedSeconds
    const totalSeconds = extraOptions.player?.current?.getDuration()

    const formatTime = (seconds: number) => dayjs().startOf('day').add(seconds, 'second').format('mm:ss')

    return (
        <section className='flex gap-1 text-nowrap items-center font-mono tabular-nums'>
            <span>{formatTime(playedSeconds)}</span>
            <span>/</span>
            <span>{formatTime(totalSeconds || 0)}</span>
        </section>
    )
}
