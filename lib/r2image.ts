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

export const r2Upload = (toast: Function, callbackFn: Function): ChangeEventHandler<HTMLInputElement> => {
    return async (event) => {
        const isImage = (file: { type: string }) => {
            const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
            return file && acceptedImageTypes.includes(file.type)
        }
        console.log('here')

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
            console.log('here2')
            const form = new FormData()
            form.append('file', selectedFile)
            await fetch('/api/image/upload', {
                method: 'POST',
                body: form,
            })
            console.log('here3')
            callbackFn()
        }
    }
}

export const getR2UploadList = async () => {
    const rawList = await fetch('/api/image/list', { method: 'POST' })
    const list = (await rawList.json()) as RawR3List[]
    return list?.map((obj) => ({
        name: obj.Key,
        url: process.env.NEXT_PUBLIC_R2_URL + `/${obj.Key}`,
        date: obj.LastModified,
    })) as ImageList[]
}
