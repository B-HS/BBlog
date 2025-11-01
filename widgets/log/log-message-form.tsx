'use client'

import { useCreateMessage } from '@entities/message.client'
import { useUploadImage } from '@entities/image.client'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Button } from '@ui/button'
import { Textarea } from '@ui/textarea'
import { LOG_USER_ID } from '@lib/constants'
import { ImageIcon, Loader2, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'

const getInitials = (name: string) => {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
}

export const LogMessageForm = ({ userImage, userName }: { userImage?: string | null; userName?: string }) => {
    const [body, setBody] = useState('')
    const [attachedImageIds, setAttachedImageIds] = useState<string[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const { mutate: createMessage, isPending: isCreating } = useCreateMessage(LOG_USER_ID)
    const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (files.length === 0) return

        const imageFiles = files.filter((file) => file.type.startsWith('image/'))
        if (imageFiles.length !== files.length) {
            toast.error('이미지 파일만 업로드 가능합니다')
            return
        }

        try {
            const uploadPromises = imageFiles.map((file) => uploadImage(file))
            const responses = await Promise.all(uploadPromises)
            const results = await Promise.all(responses.map((res) => res.json()))

            const newImageIds: string[] = []
            const newPreviewUrls: string[] = []

            results.forEach((result) => {
                if (result.imageId && result.url) {
                    newImageIds.push(result.imageId)
                    newPreviewUrls.push(result.url)
                }
            })

            if (newImageIds.length > 0) {
                setAttachedImageIds([...attachedImageIds, ...newImageIds])
                setPreviewUrls([...previewUrls, ...newPreviewUrls])
                toast.success(`${newImageIds.length}개의 이미지가 업로드되었습니다`)
            }
        } catch (error) {
            toast.error('이미지 업로드에 실패했습니다')
        } finally {
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleRemoveImage = (index: number) => {
        setAttachedImageIds(attachedImageIds.filter((_, i) => i !== index))
        setPreviewUrls(previewUrls.filter((_, i) => i !== index))
    }

    const handleSubmit = () => {
        if (!body.trim() && attachedImageIds.length === 0) return

        createMessage(
            {
                body: body.trim(),
                imageIds: attachedImageIds,
            },
            {
                onSuccess: () => {
                    setBody('')
                    setAttachedImageIds([])
                    setPreviewUrls([])
                },
            },
        )
    }

    return (
        <article className='flex gap-3 border-b border-border p-3 bg-background'>
            <div className='flex-shrink-0'>
                <Avatar className='h-10 w-10'>
                    <AvatarImage src={userImage || undefined} alt={userName || ''} />
                    <AvatarFallback>{getInitials(userName || '')}</AvatarFallback>
                </Avatar>
            </div>

            <div className='flex-1 min-w-0 space-y-1'>
                <label htmlFor='message-textarea' className='sr-only'>
                    메시지 작성
                </label>
                <Textarea
                    id='message-textarea'
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    placeholder='메시지 작성'
                    className='focus-visible:ring-0 p-3 text-base shadow-none resize-none min-h-[60px] max-h-[300px] overflow-y-auto'
                    disabled={isCreating || isUploading}
                />

                {previewUrls.length > 0 && (
                    <div className='grid grid-cols-2 gap-2'>
                        {previewUrls.map((url, index) => (
                            <div key={index} className='relative aspect-square rounded-lg overflow-hidden bg-muted group'>
                                <img src={url} alt={`첨부 이미지 ${index + 1}`} className='w-full h-full object-cover' />
                                <button
                                    onClick={() => handleRemoveImage(index)}
                                    className='absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity'
                                    aria-label='이미지 제거'>
                                    <X className='size-3.5' />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className='flex items-center justify-end gap-2'>
                    <div className='flex items-center'>
                        <input
                            ref={fileInputRef}
                            type='file'
                            accept='image/*'
                            multiple
                            onChange={handleImageChange}
                            className='hidden'
                            id='image-upload'
                            disabled={isUploading || isCreating}
                        />
                        <Button
                            type='button'
                            variant='outline'
                            size='icon'
                            className='shadow-none'
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading || isCreating}
                            aria-label='이미지 첨부'
                            aria-busy={isUploading}>
                            {isUploading ? <Loader2 className='size-3.5 animate-spin' /> : <ImageIcon className='size-3.5' />}
                        </Button>
                    </div>
                    <Button onClick={handleSubmit} disabled={(!body.trim() && attachedImageIds.length === 0) || isCreating || isUploading}>
                        {isCreating ? <Loader2 className='size-3.5 animate-spin' /> : '게시'}
                    </Button>
                </div>
            </div>
        </article>
    )
}
