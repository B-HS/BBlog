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
            const text = `![${obj.alt || 'Image'}${obj.width ? '||w' + obj.width : ''}${obj.height ? '||h' + obj.height : ''}](${obj.src})`

            navigator.clipboard.writeText(text)
            toast({
                title: 'Copied to clipboard',
                description: 'Image tag copied to clipboard',
            })
            return {
                ...obj,
                imgInput: text,
            }
        })
    }

    return (
        <section className='flex flex-col gap-2'>
            <Label className='text-lg'>Image Tag</Label>
            <section className='flex justify-between gap-2'>
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm flex-auto')}
                    placeholder='Image URL'
                    value={imageObj.src}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, src: e.target.value }))}
                />
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm flex-auto')}
                    placeholder='Image Alt'
                    value={imageObj.alt}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, alt: e.target.value }))}
                />
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm flex-auto')}
                    placeholder='Image Width'
                    value={imageObj.width}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, width: e.target.value }))}
                    disabled={!!imageObj.height}
                />
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm flex-auto')}
                    placeholder='Image Height'
                    value={imageObj.height}
                    onChange={(e) => setImageObj((obj) => ({ ...obj, height: e.target.value }))}
                    disabled={!!imageObj.width}
                />
            </section>

            <section className='flex gap-2'>
                <Input
                    className={cn(badgeVariants({ variant: 'outline' }), 'h-8 rounded-sm flex-auto')}
                    value={imageObj.imgInput}
                    onChange={() => {}}
                    disabled
                />
                <Button className='h-8 transition-all' variant={'outline'} onClick={generateImageTag}>
                    Generate Image Tag
                </Button>
            </section>
        </section>
    )
}
