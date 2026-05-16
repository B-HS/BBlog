'use client'

import { useDeleteImage, useGetImageList, useUploadImage } from '@entities/image.client'
import { Image } from '@ui/image'
import { Button } from '@ui/button'
import { ChangeEvent, FC, MouseEvent } from 'react'
import { toast } from 'sonner'
import { X } from 'lucide-react'

export const PostImages: FC = () => {
    const { data } = useGetImageList()
    const { mutate: uploadImage } = useUploadImage()
    const { mutate: deleteImage } = useDeleteImage()

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

    const handleDeleteImage = (e: MouseEvent<HTMLButtonElement>, id: string) => {
        e.stopPropagation()
        deleteImage(id, {
            onSuccess: () => toast.success('이미지를 삭제했습니다'),
            onError: () => toast.error('이미지 삭제에 실패했습니다'),
        })
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
            <div className='flex gap-2 overflow-x-auto pb-2'>
                {data?.map((image) => (
                    <div
                        key={image.id}
                        className='group relative size-24 shrink-0 cursor-pointer rounded-sm overflow-hidden border border-border'
                        onClick={() => copyImageMarkdown(image.url, '')}>
                        <Image src={image.url} alt='' fill className='object-cover' sizes='96px' />
                        <button
                            type='button'
                            aria-label='이미지 삭제'
                            onClick={(e) => handleDeleteImage(e, image.id)}
                            className='absolute right-1 top-1 flex size-5 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80'>
                            <X className='size-3' />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
