'use client'
import { Editor } from '@tiptap/react'
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
import { RefObject } from 'react'
import Flex from '../flex'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
const EditorMenubar = ({ editor, inputRef }: { editor: Editor | null; inputRef: RefObject<HTMLInputElement> }) => {
    return (
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
    )
}

export default EditorMenubar
