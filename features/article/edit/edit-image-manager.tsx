'use client'

import { badgeVariants } from '@shared/ui/badge'
import { Button } from '@shared/ui/button'
import { Input } from '@shared/ui/input'
import { Label } from '@shared/ui/label'
import { useToast } from '@shared/ui/use-toast'
import { cn } from '@shared/utils'
import { Dispatch, FC, SetStateAction } from 'react'

type EditDescriptionProps = {
    imageObj: Record<string, string | number>
    setImageObj: Dispatch<SetStateAction<Record<string, string | number>>>
}

export const EditImageManager: FC<EditDescriptionProps> = ({ imageObj, setImageObj }) => {
    const { toast } = useToast()

    const generateImageTag = () => {
        setImageObj((obj) => {
            navigator.clipboard.writeText(`<img src="${obj.src}" alt="${obj.alt}" width="${obj.width}" height="${obj.height}"/>`)
            toast({
                title: 'Copied to clipboard',
                description: 'Image tag copied to clipboard',
            })
            return {
                ...obj,
                imgInput: `<img src="${obj.src}" alt="${obj.alt}" width="${obj.width}" height="${obj.height}"/>`,
            }
        })
    }

    return (
        <section className='flex flex-col gap-2'>
            <Label className='text-lg'>Image Tag</Label>
            <section className='flex gap-2'>
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm')}
                    placeholder='Image URL'
                    value={imageObj.src}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, src: e.target.value }))}
                />
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm')}
                    placeholder='Image Alt'
                    value={imageObj.alt}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, alt: e.target.value }))}
                />
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm')}
                    placeholder='Image Width'
                    value={imageObj.width}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, width: e.target.value }))}
                />
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm')}
                    placeholder='Image Height'
                    value={imageObj.height}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, height: e.target.value }))}
                />
            </section>

            <section className='flex gap-2'>
                <Input className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm')} value={imageObj.imgInput} disabled />
                <Button className='h-8' variant={'outline'} onClick={generateImageTag}>
                    Generate Image Tag
                </Button>
            </section>
        </section>
    )
}
