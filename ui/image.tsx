'use client'

import Image from 'next/image'
import { ComponentProps, FC, useState } from 'react'

interface FallbackImageProps extends ComponentProps<typeof Image> {
    src: string
}

export const FallbackImage: FC<FallbackImageProps> = ({ src, ...rest }) => {
    const [imageURL, setImageURL] = useState<ComponentProps<typeof Image>['src']>(src)
    return <Image src={imageURL} onError={() => setImageURL('/favicon.ico')} {...rest} />
}

export { FallbackImage as Image }
