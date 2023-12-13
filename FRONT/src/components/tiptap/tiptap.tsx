'use client'
import useInput from '@/hooks/useInput'
import { handleFileChange } from '@/lib/upload'
import { Color } from '@tiptap/extension-color'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import dayjs from 'dayjs'
import { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import ArticleContext, { Article } from '../article/articleContext'
import Flex from '../flex'
import { Input } from '../ui/input'
import { Separator } from '../ui/separator'
import { useToast } from '../ui/use-toast'
import EditorMenubar from './tiptapMenubar'

const Tiptap = forwardRef(({ tags }: { tags: string[] }, tEditor) => {
    const [title, onChangeTitle, setTitle] = useInput()
    const [html, setHtml] = useState('')
    const [imageList, setImageList] = useState<string[]>([])
    const { toast } = useToast()
    const inputRef = useRef<HTMLInputElement>(null)

    const previewData = useMemo(
        () => ({
            aid: 10,
            title,
            context: html,
            insertDate: dayjs().format('YYYYMMDDHHmmss'),
            tags: tags,
        }),
        [html, title, tags],
    )

    const editor = useEditor({
        onUpdate: ({ editor }) => setHtml(editor.getHTML()),
        extensions: [
            Image,
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
    const getImages = () => imageList
    const getTitle = () => title

    const addImageToEditor = (imgName: string) => {
        editor
            ?.chain()
            .focus()
            .setImage({ src: `https://img.gumyo.net/${imgName}` })
            .run()
        setImageList((ele) => [...ele, imgName])
    }

    useImperativeHandle(tEditor, () => ({
        getTitle,
        getHTML,
        reset,
        getImages,
    }))
    return (
        <Flex className='p-0 flex-1 gap-5 flex-wrap'>
            <Flex className='flex-1 flex-col border p-0 h-full'>
                <Input
                    value={title}
                    onChange={onChangeTitle}
                    placeholder='Title'
                    className='border-0 h-16 text-xl focus-visible:ring-0 focus-visible:ring-offset-0'
                />
                <Separator />
                <EditorMenubar editor={editor} inputRef={inputRef} />
                <Separator />
                <Flex className='w-full h-full' onClick={() => editor?.commands.focus()}>
                    <EditorContent className='w-full p-3 [&>*:focus-visible]:outline-none' editor={editor} />
                </Flex>
            </Flex>
            <Flex className='p-5 flex-1 border min-w-[560px]'>
                <ArticleContext data={previewData as Article} category={'PREVIEW'} />
            </Flex>
            <input type='file' ref={inputRef} style={{ display: 'none' }} onChange={handleFileChange(toast, addImageToEditor)} />
        </Flex>
    )
})
Tiptap.displayName = 'Tiptap'
export default Tiptap
