'use client'

import React, { createContext, ReactNode, RefObject, useContext, useReducer } from 'react'
import ReactPlayer from 'react-player'

export type TrackOpt = { index: number; name: string; language: string; groupId: string; kind: string }
export type AudioOpt = { index: number; name: string; language: string; groupId: string }
export type QualityOpt = { index: number; bitrate: number; resolution: string }

export type PlayerOptions = {
    url: string
    playing: boolean
    loop: boolean
    controls: boolean
    light: boolean
    volume: number
    muted: boolean
    width: string
    height: string
    progressInterval: number
    playbackRate: number
    playsinline: boolean
    pip: boolean
}

export type ExtraOptions = {
    player: RefObject<ReactPlayer | null> | null
    isFull: boolean
    languages: TrackOpt[]
    audios: AudioOpt[]
    qualities: QualityOpt[]
    playedRatio: number
    loadedRatio: number
    isCursorVisible: boolean
    playedSeconds: number
    loadedSeconds: number
}

export const defaultPlayerOptions: PlayerOptions = {
    url: '',
    playing: false,
    loop: false,
    controls: false,
    light: false,
    volume: 1,
    muted: false,
    width: '100%',
    height: '100%',
    progressInterval: 100,
    playbackRate: 1.0,
    playsinline: false,
    pip: false,
}

export const defaultExtraOptions: ExtraOptions = {
    player: null,
    isFull: false,
    languages: [],
    audios: [],
    qualities: [],
    playedRatio: 0,
    loadedRatio: 0,
    playedSeconds: 0,
    loadedSeconds: 0,
    isCursorVisible: true,
}

type PlayerAction = { type: 'SET_PLAYER_OPTIONS'; payload: Partial<PlayerOptions> }
type ExtraAction = { type: 'SET_EXTRA_OPTIONS'; payload: Partial<ExtraOptions> }

const playerReducer = (state: PlayerOptions, action: PlayerAction): PlayerOptions => {
    switch (action.type) {
        case 'SET_PLAYER_OPTIONS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const extraReducer = (state: ExtraOptions, action: ExtraAction): ExtraOptions => {
    switch (action.type) {
        case 'SET_EXTRA_OPTIONS':
            return { ...state, ...action.payload }
        default:
            return state
    }
}

const PlayerContext = createContext<{ state: PlayerOptions; dispatch: React.Dispatch<PlayerAction> } | undefined>(undefined)
const ExtraContext = createContext<{ state: ExtraOptions; dispatch: React.Dispatch<ExtraAction> } | undefined>(undefined)

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(playerReducer, defaultPlayerOptions)
    return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>
}

export const ExtraProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(extraReducer, defaultExtraOptions)
    return <ExtraContext.Provider value={{ state, dispatch }}>{children}</ExtraContext.Provider>
}

export const usePlayerStore = () => {
    const context = useContext(PlayerContext)
    if (!context) {
        throw new Error('usePlayerStore must be used within a PlayerProvider')
    }
    return context
}

export const useExtraOptionsStore = () => {
    const context = useContext(ExtraContext)
    if (!context) {
        throw new Error('useExtraOptionsStore must be used within an ExtraProvider')
    }
    return context
}

export const resolutionMapper = (resolution: QualityOpt): { width: string; height: string } => {
    try {
        const [width, height] = resolution.resolution.split('x')
        return { width, height }
    } catch (error) {
        return { width: '0', height: '0' }
    }
}
