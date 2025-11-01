'use client'

import Image from 'next/image'
import { ComponentProps, FC, useState } from 'react'

interface FallbackImageProps extends ComponentProps<typeof Image> {
    src: string
    subSrc?: string
}

export const FallbackImage: FC<FallbackImageProps> = ({ src, subSrc, ...rest }) => {
    const [imageURL, setImageURL] = useState<ComponentProps<typeof Image>['src']>(src)

    const handleError = () => {
        if (imageURL === src && subSrc) {
            setImageURL(subSrc)
        } else if (imageURL !== '/favicon.ico') {
            setImageURL('/favicon.ico')
        }
    }

    return <Image src={imageURL} onError={handleError} {...rest} />
}

export { FallbackImage as Image }
