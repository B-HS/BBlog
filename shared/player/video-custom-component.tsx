'use client'
import { DetailedHTMLProps, VideoHTMLAttributes } from 'react'
import { Player } from './player'

export const VideoComponent = (props: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & { alt?: string }) => {
    const src = typeof props.src === 'string' ? props.src : ''
    return <Player key={src} url={src} title={props.alt} />
}
