'use client'

import { Button } from '@ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@ui/carousel'
import { Dialog, DialogContent, DialogTitle } from '@ui/dialog'
import { Image } from '@ui/image'
import { XIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ImageModalProps {
    images: { id: string; url: string }[]
    initialIndex: number
    open: boolean
    onOpenChange: (open: boolean) => void
}

export const ImageModal = ({ images, initialIndex, open, onOpenChange }: ImageModalProps) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!api) {
            return
        }

        setCount(api.scrollSnapList().length)
        setCurrent(api.selectedScrollSnap())

        api.on('select', () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    useEffect(() => {
        if (api && open) {
            api.scrollTo(initialIndex)
        }
    }, [api, initialIndex, open])

    const getFullImageUrl = (url: string) => {
        return url.replaceAll('/thumbnail.webp', '/pc.webp')
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className='h-dvh w-dvw sm:max-w-dvw p-0 border-0 rounded-none flex flex-col' showCloseButton={false}>
                <DialogTitle className='sr-only'>Image Modal</DialogTitle>
                <div className='relative size-full flex items-center justify-center bg-background'>
                    <Carousel setApi={setApi} className='size-full flex flex-col justify-center items-center'>
                        <CarouselPrevious className='left-3.5 size-12 z-50' />
                        <CarouselContent className='h-full m-0'>
                            {images.map((image) => (
                                <CarouselItem key={image.id} className='flex items-center justify-center px-20'>
                                    <div
                                        className='cursor-pointer size-full flex items-center justify-center'
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onOpenChange(false)
                                        }}>
                                        <Image
                                            src={getFullImageUrl(image.url)}
                                            alt={image.id}
                                            width={1920}
                                            height={1080}
                                            className='max-h-full max-w-full object-contain'
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselNext className='right-3.5 size-12 z-50' />
                        <Button
                            variant={'outline'}
                            size={'icon'}
                            className='size-15 absolute top-3.5 left-1/2 -translate-x-1/2 rounded-full'
                            onClick={() => onOpenChange(false)}>
                            <XIcon className='size-7' />
                        </Button>
                        {images.length > 1 && (
                            <>
                                <div className='absolute bottom-3.5 left-1/2 -translate-x-1/2'>
                                    {current + 1} / {count}
                                </div>
                            </>
                        )}
                    </Carousel>
                </div>
            </DialogContent>
        </Dialog>
    )
}
