import { useEffect } from 'react'
import { usePlayerStore } from '../player-store'
import { useVideoControl } from './useVideoControl'

export const useVideoKeyHandler = () => {
    const { state: playerOptions, dispatch: setPlayerOptions } = usePlayerStore()
    const { playToggle, playSeekToBySeconds, muteToggle, fullscreenToggle, pipModeToggle } = useVideoControl()
    useEffect(() => {
        const handleKeyDown = (e: { key: string; code: string }) => {
            if (e.code === 'Space') {
                playToggle()
            }
            if (e.key === 'ArrowRight') {
                playSeekToBySeconds(10)
            }
            if (e.key === 'ArrowLeft') {
                playSeekToBySeconds(-10)
            }
            if (e.key === 'm') {
                muteToggle()
            }
            if (e.key === 'f') {
                fullscreenToggle()
            }
            if (e.key === 'p') {
                pipModeToggle()
            }
            if (e.key === 'ArrowUp') {
                setPlayerOptions({ type: 'SET_PLAYER_OPTIONS', payload: { volume: playerOptions.volume < 0.95 ? playerOptions.volume + 0.05 : 1 } })
            }
            if (e.key === 'ArrowDown') {
                setPlayerOptions({ type: 'SET_PLAYER_OPTIONS', payload: { volume: playerOptions.volume > 0.05 ? playerOptions.volume - 0.05 : 0 } })
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [fullscreenToggle, muteToggle, pipModeToggle, playSeekToBySeconds, playToggle, playerOptions.volume, setPlayerOptions])
}
