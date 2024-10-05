import { useEffect } from 'react'
import { useExtraOptionsStore } from '../player-store'

export const useVideoFullScreenHandler = () => {
    const { state: extraOptions, dispatch: setExtraOptions } = useExtraOptionsStore()

    useEffect(() => {
        // eslint-disable-next-line
        let timeout: string | number | NodeJS.Timeout | undefined

        const handleMouseMove = () => {
            setExtraOptions({ type: 'SET_EXTRA_OPTIONS', payload: { isCursorVisible: true } })
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                setExtraOptions({ type: 'SET_EXTRA_OPTIONS', payload: { isCursorVisible: false } })
            }, 1500)
        }

        if (extraOptions.isFull) {
            setExtraOptions({ type: 'SET_EXTRA_OPTIONS', payload: { isCursorVisible: true } })
            window.addEventListener('mousemove', handleMouseMove)
        } else {
            setExtraOptions({ type: 'SET_EXTRA_OPTIONS', payload: { isCursorVisible: true } })
            window.removeEventListener('mousemove', handleMouseMove)
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            clearTimeout(timeout)
        }
    }, [extraOptions.isFull, setExtraOptions])
}
