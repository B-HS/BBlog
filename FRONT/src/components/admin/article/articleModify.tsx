'use client'
import { getPostById, savePost } from '@/api/article/post'
import SubmitArticle from '@/components/editor/submitArticle'
import Flex from '@/components/flex'
import Tiptap from '@/components/tiptap/tiptap'
import { Badge } from '@/components/ui/badge'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import useInput from '@/hooks/useInput'
import { tokenCheck } from '@/lib/token'
import { useEffect, useRef, useState } from 'react'
import { Article } from '../../article/articleContext'

const Modify = ({ article }: { article: Article }) => {
    const editor = useRef<{
        getTitle: Function
        getHTML: Function
        reset: Function
        getImages: Function
        setArticle: Function
    }>(null)
    const { toast } = useToast()
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, onChangeTagInput, setTagInput] = useInput()
    const [ctxImageList, setCtxImageList] = useState<string[]>([])
    const [ableToAccess, setAbleToAccess] = useState(false)
    const [currentMenu, setCurrentMenu] = useState<number>(0)
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

    useEffect(() => {
        if (article) {
            getPostById(article.aid).then((data) => {
                console.log(data)

                if (data) {
                    editor.current?.setArticle(data)
                    setCurrentMenu(data.mekey)
                }
            })
        }
    }, [article])

    const removeTagFromList = (tag: string) => setTags(() => [...tags.filter((ele) => ele !== tag)])
    const saveArticle = async (extraInfo: { thumbnail: string; mekey: number; hide: boolean; insertdate: string; href: string }) => {
        const post = { aid: article.aid, title: editor.current?.getTitle(), context: editor.current?.getHTML(), tags, ...extraInfo }
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
            window.location.href = `${post.href}/${aid}`
        }
    }

    useEffect(() => {
        if (!tokenCheck()) {
            window.location.href = '/'
        } else {
            setAbleToAccess(true)
        }
    }, [])

    return (
        ableToAccess && (
            <Flex className='flex-col h-full'>
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
                </Flex>
                <Flex className='p-0 w-100 justify-end'>
                    <SubmitArticle saveArticle={saveArticle} ctxImageList={ctxImageList} currentMenu={currentMenu}>
                        <Button className='rounded' variant={'outline'} onClick={() => setCtxImageList(editor.current?.getImages())}>
                            Confirm
                        </Button>
                    </SubmitArticle>
                </Flex>
            </Flex>
        )
    )
}
export default Modify
