import { serverFetchData } from '@lib/api/client'
import 'server-only'

export type Image = {
    id: string
    r2Key: string
    url: string
    mimeType: string
    sizeBytes: number
    width: number | null
    height: number | null
    createdAt: string
}

export const getImageList = async () => {
    const data = await serverFetchData<{ images: Image[] }>('/api/blog/images', {
        cache: 'no-store',
    })
    return data.images
}
