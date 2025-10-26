import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useUploadImage } from '@entities/image.client'

interface UseImageUploadProps {
    editorRef: React.RefObject<HTMLDivElement>
    onImageInsert: (markdown: string) => void
}

export const useImageUpload = ({ editorRef, onImageInsert }: UseImageUploadProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null)
    const cursorPositionRef = useRef<{ range: Range | null; selection: Selection | null }>({
        range: null,
        selection: null,
    })
    const [isUploading, setIsUploading] = useState(false)
    const { mutateAsync: uploadImage } = useUploadImage()

    const saveCursorPosition = () => {
        const selection = window.getSelection()
        if (!selection || selection.rangeCount === 0) {
            if (editorRef.current) {
                const range = document.createRange()
                range.selectNodeContents(editorRef.current)
                range.collapse(false)
                cursorPositionRef.current = { range, selection: window.getSelection() }
            }
            return
        }

        const range = selection.getRangeAt(0).cloneRange()
        cursorPositionRef.current = { range, selection }
    }

    const restoreCursorPosition = () => {
        const { range, selection } = cursorPositionRef.current
        if (range && selection) {
            selection.removeAllRanges()
            selection.addRange(range)
        }
    }

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (!file) return

        if (!file.type.startsWith('image/')) {
            toast.error('이미지 파일만 업로드 가능합니다')
            return
        }

        const maxSize = 10 * 1024 * 1024
        if (file.size > maxSize) {
            toast.error('파일 크기는 10MB 이하여야 합니다')
            return
        }

        const placeholderId = `uploading-${Date.now()}`
        const placeholderMarkdown = `![Uploading...](${placeholderId})`

        if (editorRef.current) {
            restoreCursorPosition()
            const selection = window.getSelection()
            if (selection && selection.rangeCount > 0) {
                const range = selection.getRangeAt(0)
                range.deleteContents()
                const textNode = document.createTextNode(placeholderMarkdown)
                range.insertNode(textNode)
                range.setStartAfter(textNode)
                range.setEndAfter(textNode)
                selection.removeAllRanges()
                selection.addRange(range)
            } else {
                editorRef.current.innerText += placeholderMarkdown
            }
            onImageInsert(editorRef.current.innerText)
        }

        setIsUploading(true)
        try {
            const response = await uploadImage(file)
            const result = await response.json()

            if (!result.url) {
                throw new Error('Upload failed')
            }

            if (editorRef.current) {
                const currentText = editorRef.current.innerText
                const imageUrl = result.url

                const actualMarkdown = `![${file.name}](${imageUrl})`
                const updatedText = currentText.replace(placeholderMarkdown, actualMarkdown)

                editorRef.current.innerText = updatedText
                onImageInsert(updatedText)

                const textNode = editorRef.current.firstChild || editorRef.current
                const position = updatedText.indexOf(actualMarkdown) + actualMarkdown.length
                const range = document.createRange()
                const selection = window.getSelection()

                if (textNode.nodeType === Node.TEXT_NODE) {
                    range.setStart(textNode, Math.min(position, textNode.textContent?.length || 0))
                    range.setEnd(textNode, Math.min(position, textNode.textContent?.length || 0))
                } else {
                    range.selectNodeContents(editorRef.current)
                    range.collapse(false)
                }

                selection?.removeAllRanges()
                selection?.addRange(range)
            }

            toast.success('이미지가 업로드되었습니다')
        } catch (error) {
            console.error('Image upload failed:', error)
            toast.error('이미지 업로드에 실패했습니다')

            if (editorRef.current) {
                const currentText = editorRef.current.innerText
                const updatedText = currentText.replace(placeholderMarkdown, '')
                editorRef.current.innerText = updatedText
                onImageInsert(updatedText)
            }
        } finally {
            setIsUploading(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const handleImageButtonClick = () => {
        saveCursorPosition()
        fileInputRef.current?.click()
    }

    return {
        fileInputRef,
        handleFileSelect,
        handleImageButtonClick,
        isUploading,
    }
}
