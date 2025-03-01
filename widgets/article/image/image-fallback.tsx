'use client'

import { useEffect } from 'react'
import seyana from './seyana.jpg'

export const ImageFallbackSetter = () => {
    useEffect(() => {
        const images = document.querySelectorAll('img')
        images.forEach((image) => {
            image.onerror = () => {
                image.srcset = seyana.src
                image.src = seyana.src
                image.onerror = null
                console.log('replaced')
            }
        })
    }, [])
    return null
}
