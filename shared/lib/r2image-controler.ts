import { ChangeEventHandler } from 'react'
export interface RawR3List {
    Key: string
    LastModified: string
    ETag: string
    Size: number
    StorageClass: string
    Owner: {
        DisplayName: string
        ID: string
    }
}

export interface ImageList {
    name: string
    url: string
    date: string
}

const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'webp', 'tiff', 'ico']

export const r2Upload = (toast: Function, callbackFn: Function): ChangeEventHandler<HTMLInputElement> => {
    return async (event) => {
        const isImage = (file: { type: string }) => {
            const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
            return file && acceptedImageTypes.includes(file.type)
        }

        const selectedFile = event.target.files?.[0]
        if (selectedFile) {
            if (!isImage(selectedFile)) {
                toast({
                    title: 'Invalid Image',
                    description: 'Please select a valid image file.',
                    variant: 'destructive',
                })
                return
            }
            const form = new FormData()
            form.append('file', selectedFile)
            await fetch('/api/image/upload', {
                method: 'POST',
                body: form,
            })
            callbackFn()
        }
    }
}

export const getR2UploadList = async (): Promise<ImageList[]> => {
    const rawList = await fetch('/api/image/list', { method: 'GET', cache: 'no-cache' })
    const list = (await rawList.json()) as RawR3List[]
    return list
        ?.filter((obj) => imageExtensions.some((ext) => obj.Key.toLowerCase().endsWith(ext)))
        ?.map((obj) => ({
            name: obj.Key,
            url: `${process.env.NEXT_PUBLIC_R2_URL}/${obj.Key}`,
            date: obj.LastModified,
        })) as ImageList[]
}
