'use client'

import Image from 'next/image'
import { useState } from 'react'
import seyana from '../static/seyana.jpg'

export const FallbackImage = ({
    src,
    alt,
    sizes,
    fill,
    className,
    priority,
}: {
    src: string
    alt: string
    sizes: string
    fill: boolean
    className: string
    priority: boolean
}) => {
    const [imgSrc, setImgSrc] = useState(src)
    const [imgPriority, setImgPriority] = useState(priority)

    return (
        <Image
            sizes={sizes}
            fill={fill}
            src={imgSrc}
            alt={alt}
            className={className}
            priority={imgPriority}
            onError={() => {
                setImgSrc(seyana.src)
                setImgPriority(true)
            }}
        />
    )
}
