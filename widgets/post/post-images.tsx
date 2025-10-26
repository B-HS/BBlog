'use client'

import { useGetImageList, useUploadImage } from '@entities/image.client'
import { Image } from '@ui/image'
import { Button } from '@ui/button'
import { ChangeEvent, FC } from 'react'
import { toast } from 'sonner'

export const PostImages: FC = () => {
    const { data } = useGetImageList()
    const { mutate: uploadImage } = useUploadImage()

    const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (files && files.length > 0) {
            Array.from(files).forEach((file) => {
                uploadImage(file, {
                    onSuccess: () => {
                        toast.success(`${file.name} 업로드 완료`)
                    },
                })
            })
            e.target.value = ''
        }
    }

    const copyImageMarkdown = (url: string, alt: string) => {
        const markdown = `![${alt}](${url})`
        navigator.clipboard.writeText(markdown)
        toast.success('이미지 마크다운이 복사되었습니다')
    }

    return (
        <div className='flex flex-col gap-3 p-3.5'>
            <div className='flex items-center justify-between'>
                <h3 className='text-sm font-medium'>이미지</h3>
                <Button size='sm' variant='outline' asChild>
                    <label className='cursor-pointer'>
                        파일 선택
                        <input type='file' className='hidden' accept='image/*' multiple onChange={handleUploadImage} />
                    </label>
                </Button>
            </div>
            <div className='grid grid-cols-7 gap-2 max-h-50 overflow-y-auto'>
                {data?.map((image) => (
                    <div
                        key={image.imageId}
                        className='relative aspect-square cursor-pointer rounded-sm overflow-hidden border border-border'
                        onClick={() => copyImageMarkdown(image.url, image.originalName || '')}>
                        <Image src={image.url} alt={image.originalName || ''} fill className='object-cover' sizes='150px' />
                    </div>
                ))}
            </div>
        </div>
    )
}
