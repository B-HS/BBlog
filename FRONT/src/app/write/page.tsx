'use client'
import { savePost } from '@/api/article/post'
import SubmitArticle from '@/components/editor/submitArticle'
import Flex from '@/components/flex'
import Tiptap from '@/components/tiptap/tiptap'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import useInput from '@/hooks/useInput'
import { tokenCheck } from '@/lib/token'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

const Write = () => {
    const router = useRouter()
    const editor = useRef<{
        getTitle: Function
        getHTML: Function
        reset: Function
        getImages: Function
    }>(null)
    const { toast } = useToast()
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, onChangeTagInput, setTagInput] = useInput()
    const [ctxImageList, setCtxImageList] = useState<string[]>([])
    const [ableToAccess, setAbleToAccess] = useState(false)
    const tagKeyEventer = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.nativeEvent.isComposing && e.key === 'Enter') return
        if ([',', 'Enter'].includes(e.key)) {
            if (tags.includes(tagInput)) {
                toast({
                    title: 'Duplicated Tag',
                    description: 'Please enter the correct tag.',
                    variant: 'destructive',
                })
                return
            } else {
                setTags((ele) => [...ele, tagInput])
            }
            setTagInput('')
        }
    }
    const removeTagFromList = (tag: string) => setTags(() => [...tags.filter((ele) => ele !== tag)])
    const saveArticle = async (extraInfo: { thumbnail: string; mekey: number; hide: boolean; insert_date: string; href: string }) => {
        const post = { title: editor.current?.getTitle(), context: editor.current?.getHTML(), tags, ...extraInfo }
        const aid = await savePost(post)
        if (aid) {
            editor.current?.reset()
            setTags([])
            setTagInput('')
            setCtxImageList([])
            toast({
                title: 'Success',
                description: 'Article saved successfully.',
            })
            router.push(`${post.href}/${aid}`)
        }
    }

    useEffect(() => {
        if (!tokenCheck()) {
            router.push(`/`)
            window.location.href = '/'
        } else {
            setAbleToAccess(true)
        }
    }, [router])

    return (
        ableToAccess && (
            <Flex className='flex-col h-full gap-2'>
                <Tiptap ref={editor} tags={tags} />
                <Flex className='p-0 flex-col gap-2'>
                    <Input className='rounded-none' onKeyDown={tagKeyEventer} value={tagInput} onChange={onChangeTagInput} />
                    <Flex className='p-0 gap-2 flex-wrap'>
                        {tags.map((tag, idx) => (
                            <Badge
                                className={buttonVariants({ variant: 'outline' }) + ' rounded cursor-pointer'}
                                key={idx}
                                variant={'outline'}
                                onClick={() => removeTagFromList(tag)}
                            >
                                {tag} x
                            </Badge>
                        ))}
                    </Flex>
                    <Flex className='p-0 w-100 justify-end'>
                        <SubmitArticle saveArticle={saveArticle} ctxImageList={ctxImageList}>
                            <Button className='rounded' variant={'outline'} onClick={() => setCtxImageList(editor.current?.getImages())}>
                                Confirm
                            </Button>
                        </SubmitArticle>
                    </Flex>
                </Flex>
            </Flex>
        )
    )
}
export default Write
