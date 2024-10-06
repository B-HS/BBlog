'use client'
import { DetailedHTMLProps, VideoHTMLAttributes } from 'react'
import { Player } from './player'

export const VideoComponent = (props: DetailedHTMLProps<VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement> & { alt?: string }) => {
    return <Player key={props.src} url={props.src || ''} title={props.alt} />
}
