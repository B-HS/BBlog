'use client'

import { MisskeyPost } from '@entities/misskey'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@shared/ui/carousel'
import { Dialog, DialogContent, DialogTrigger } from '@shared/ui/dialog'
import Image from 'next/image'
import { Fragment, ReactNode, useCallback, useState } from 'react'

export const ResizableImageModal = ({ url, children }: { url: string; children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleRightClick = useCallback((e: React.MouseEvent) => {
        e.preventDefault()
    }, [])

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='size-fit p-0 min-w-96 min-h-96'>
                <Image src={url} alt='Resizable Image' layout='fill' objectFit='contain' className='pointer-events-none' />
            </DialogContent>
        </Dialog>
    )
}

export const MisskeyPostImageCarousel = ({ images }: { images: MisskeyPost['files'] }) => {
    return (
        <Carousel className='w-full max-w-[300px] border p-2 bg-secondary'>
            <CarouselContent className=''>
                {images?.map((image) => (
                    <Fragment key={image.id}>
                        <CarouselItem className='flex flex-col items-center justify-center'>
                            <ResizableImageModal url={image.url}>
                                <Image
                                    src={image.url}
                                    width={image.properties.width}
                                    height={image.properties.height}
                                    className='size-full'
                                    alt={image.id}
                                />
                            </ResizableImageModal>
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
