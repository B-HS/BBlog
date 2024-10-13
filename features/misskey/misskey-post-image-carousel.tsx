'use client'

import { MisskeyPost } from '@entities/misskey'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shared/ui/carousel'
import Image from 'next/image'
import { Fragment } from 'react'

export const MisskeyPostImageCarousel = ({ images }: { images: MisskeyPost['files'] }) => {
    return (
        <Carousel className='w-full max-w-[300px] border p-2 bg-secondary'>
            <CarouselContent className=''>
                {images?.map((image) => (
                    <Fragment key={image.id}>
                        <CarouselItem className='flex flex-col items-center justify-center'>
                            <Image
                                src={image.url}
                                width={image.properties.width}
                                height={image.properties.height}
                                className='size-full'
                                alt={image.id}
                            />
                            <p>{image.name}</p>
                        </CarouselItem>
                    </Fragment>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
