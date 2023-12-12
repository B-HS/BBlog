import { ChangeEventHandler } from 'react'

const handleFileChange = (toast: Function, callbackFn: Function, setLoadState?: Function): ChangeEventHandler<HTMLInputElement> => {
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
            setLoadState && setLoadState(true)
            form.append('file', selectedFile)
            const fileUploadObj = await fetch('/api/img/upload', {
                method: 'POST',
                body: form,
            })
            const filename = await fileUploadObj.json()
            callbackFn(filename)
            setLoadState && setLoadState(false)
        }
    }
}

export { handleFileChange }
