import { RefObject, useEffect, useMemo, useRef, useState } from 'react'

export type TocItem = { depth: number; id: string; text: string }

type Options = {
    offset?: number
    containerRef?: RefObject<HTMLElement>
    unlockOnUserScroll?: boolean
}

const binarySearchLastLE = (arr: number[], target: number) => {
    let lo = 0
    let hi = arr.length - 1
    let ans = -1
    while (lo <= hi) {
        const mid = (lo + hi) >> 1
        if (arr[mid] <= target) {
            ans = mid
            lo = mid + 1
        } else {
            hi = mid - 1
        }
    }
    return ans
}

export const useActiveHeading = (toc: TocItem[], opts?: Options) => {
    const offset = opts?.offset ?? 0
    const container = opts?.containerRef?.current ?? document.documentElement
    const unlockOnUserScroll = opts?.unlockOnUserScroll ?? true

    const ids = useMemo(() => toc.map((t) => t.id), [toc])

    const [activeId, setActiveId] = useState('')
    const lockedIdRef = useRef<string>('')
    const topsRef = useRef<number[]>([])
    const tickingRef = useRef(false)

    const computePositions = () => {
        topsRef.current = ids.map((id) => {
            const el = document.getElementById(id)
            if (!el) return Number.POSITIVE_INFINITY
            const rect = el.getBoundingClientRect()
            const top = rect.top + window.scrollY
            return Math.floor(top)
        })
    }

    const lockTo = (id: string) => {
        lockedIdRef.current = id
        setActiveId(id)
    }
    const unlock = () => {
        lockedIdRef.current = ''
    }

    useEffect(() => {
        computePositions()

        const onScroll = () => {
            if (tickingRef.current) return
            tickingRef.current = true
            requestAnimationFrame(() => {
                if (lockedIdRef.current) {
                    tickingRef.current = false
                    return
                }
                const y = window.scrollY + offset + 1
                const idx = binarySearchLastLE(topsRef.current, y)
                const nextId = idx >= 0 ? ids[idx] : ids[0] ?? ''
                if (nextId && nextId !== activeId) setActiveId(nextId)
                tickingRef.current = false
            })
        }

        const onResize = () => computePositions()

        const unlockByUserIntent = () => {
            if (!unlockOnUserScroll) return
            if (lockedIdRef.current) unlock()
        }

        const ro = new ResizeObserver(() => computePositions())
        ro.observe(container)

        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onResize)
        window.addEventListener('load', computePositions)

        window.addEventListener('wheel', unlockByUserIntent, { passive: true })
        window.addEventListener('touchmove', unlockByUserIntent, { passive: true })
        window.addEventListener('keydown', (e) => {
            const keys = new Set(['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '])
            if (keys.has(e.key)) unlockByUserIntent()
        })

        const onHash = () =>
            setTimeout(() => {
                computePositions()
                onScroll()
            }, 0)
        window.addEventListener('hashchange', onHash)

        return () => {
            ro.disconnect()
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('load', computePositions)
            window.removeEventListener('wheel', unlockByUserIntent)
            window.removeEventListener('touchmove', unlockByUserIntent)
            window.removeEventListener('hashchange', onHash)
        }
    }, [ids.join('|'), offset, container, unlockOnUserScroll, activeId])

    return { activeId, lockTo, unlock }
}
