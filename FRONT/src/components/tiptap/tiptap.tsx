'use client'
import useInput from '@/hooks/useInput'
import { Color } from '@tiptap/extension-color'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import dayjs from 'dayjs'
import {
    BoldIcon,
    Code2Icon,
    EraserIcon,
    Heading1Icon,
    Heading2Icon,
    Heading3Icon,
    Heading4Icon,
    Heading5Icon,
    Heading6Icon,
    ImagePlusIcon,
    ItalicIcon,
    ListIcon,
    ListOrderedIcon,
    Redo2Icon,
    SeparatorHorizontalIcon,
    SquareCode,
    StrikethroughIcon,
    TextQuoteIcon,
    Undo2Icon,
} from 'lucide-react'
import { ChangeEventHandler, forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import ArticleContext, { Article } from '../article/articleContext'
import Flex from '../flex'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { useToast } from '../ui/use-toast'

const Tiptap = forwardRef(({}, tEditor) => {
    const [title, onChangeTitle, setTitle] = useInput()
    const [html, setHtml] = useState('')
    const { toast } = useToast()
    const inputRef = useRef<HTMLInputElement>(null)
    const handleFileChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
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
            const fileUploadObj = await fetch('/api/img/upload', {
                method: 'POST',
                body: form,
            })
            const filename = await fileUploadObj.json()
            editor
                ?.chain()
                .focus()
                .setImage({ src: `https://img.gumyo.net/${filename}` })
                .run()
        }
    }

    const isImage = (file: { type: string }) => {
        const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/gif']
        return file && acceptedImageTypes.includes(file.type)
    }

    const previewData = useMemo(
        () => ({
            aid: 10,
            title,
            context: html,
            fileseq: null,
            github: null,
            publishlink: null,
            insertDate: dayjs().format('YYYYMMDDHHmmss'),
            tags: ['HELLO', 'WORLD'],
        }),
        [html, title],
    )

    const editor = useEditor({
        onUpdate: ({ editor }) => setHtml(editor.getHTML()),
        extensions: [
            Image,
            Dropcursor,
            Color.configure({ types: [TextStyle.name, ListItem.name] }),
            // @ts-ignore
            TextStyle.configure({ types: [ListItem.name] }),
            StarterKit.configure({
                bulletList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
                orderedList: {
                    keepMarks: true,
                    keepAttributes: false,
                },
            }),
        ],
        content: '',
    })
    const getHTML = () => editor?.getHTML()
    const reset = () => {
        editor?.chain().clearContent().run()
        setTitle('')
    }

    useImperativeHandle(tEditor, () => ({
        getHTML,
        reset,
    }))
    return (
        <Flex className='p-0 h-full w-full gap-5 flex-wrap'>
            <Flex className='flex-1 flex-col border p-0 h-full'>
                <Input
                    value={title}
                    onChange={onChangeTitle}
                    placeholder='Title'
                    className='border-0 h-16 text-xl focus-visible:ring-0 focus-visible:ring-offset-0'
                />
                <Separator />
                <Flex className='gap-2'>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor?.isActive('heading', { level: 1 }) ? 'is-active' : ''}
                    >
                        <Heading1Icon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor?.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        <Heading2Icon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor?.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    >
                        <Heading3Icon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 4 }).run()}
                        className={editor?.isActive('heading', { level: 4 }) ? 'is-active' : ''}
                    >
                        <Heading4Icon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 5 }).run()}
                        className={editor?.isActive('heading', { level: 5 }) ? 'is-active' : ''}
                    >
                        <Heading5Icon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleHeading({ level: 6 }).run()}
                        className={editor?.isActive('heading', { level: 6 }) ? 'is-active' : ''}
                    >
                        <Heading6Icon />
                    </Button>
                    <Separator orientation='vertical' />
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().undo().run()}
                        disabled={!editor?.can().chain().focus().undo().run()}
                    >
                        <Undo2Icon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().redo().run()}
                        disabled={!editor?.can().chain().focus().redo().run()}
                    >
                        <Redo2Icon />
                    </Button>
                    <Separator orientation='vertical' />
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleBold().run()}
                        disabled={!editor?.can().chain().focus().toggleBold().run()}
                        className={editor?.isActive('bold') ? 'is-active' : ''}
                    >
                        <BoldIcon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleItalic().run()}
                        disabled={!editor?.can().chain().focus().toggleItalic().run()}
                        className={editor?.isActive('italic') ? 'is-active' : ''}
                    >
                        <ItalicIcon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleStrike().run()}
                        disabled={!editor?.can().chain().focus().toggleStrike().run()}
                        className={editor?.isActive('strike') ? 'is-active' : ''}
                    >
                        <StrikethroughIcon />
                    </Button>
                    <Separator orientation='vertical' />
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleCode().run()}
                        disabled={!editor?.can().chain().focus().toggleCode().run()}
                        className={editor?.isActive('code') ? 'is-active' : ''}
                    >
                        <Code2Icon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
                        className={editor?.isActive('codeBlock') ? 'is-active' : ''}
                    >
                        <SquareCode />
                    </Button>
                    <Separator orientation='vertical' />
                    <Button size={'icon'} variant={'outline'} onClick={() => inputRef.current?.click()}>
                        <ImagePlusIcon />
                    </Button>
                    <Button size={'icon'} variant={'outline'} onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                        <EraserIcon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleBulletList().run()}
                        className={editor?.isActive('bulletList') ? 'is-active' : ''}
                    >
                        <ListIcon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                        className={editor?.isActive('orderedList') ? 'is-active' : ''}
                    >
                        <ListOrderedIcon />
                    </Button>
                    <Button
                        size={'icon'}
                        variant={'outline'}
                        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
                        className={editor?.isActive('blockquote') ? 'is-active' : ''}
                    >
                        <TextQuoteIcon />
                    </Button>
                    <Button size={'icon'} variant={'outline'} onClick={() => editor?.chain().focus().setHorizontalRule().run()}>
                        <SeparatorHorizontalIcon />
                    </Button>
                </Flex>
                <Separator />
                <Flex className='w-full h-full' onClick={() => editor?.commands.focus()}>
                    <EditorContent className='w-full p-3 [&>*:focus-visible]:outline-none' editor={editor} />
                </Flex>
            </Flex>
            <Flex className='p-5 flex-1 border min-w-[560px]'>
                <ArticleContext data={previewData as Article} category={'PREVIEW'} />
            </Flex>
            <input type='file' ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange} />
        </Flex>
    )
})
Tiptap.displayName = 'Tiptap'
export default Tiptap
