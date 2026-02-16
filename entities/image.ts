import { serverFetchData } from '@lib/api/client'
import 'server-only'

export type Image = {
    imageId: number
    userId: string
    fileName: string
    originalName: string
    url: string
    mimeType: string
    fileSize: number
    width: number
    height: number
    createdAt: Date
}

export const getImageList = async () => {
    const data = await serverFetchData<{ images: Image[] }>('/api/blog/images', {
        cache: 'no-store',
    })
    return data.images
}
