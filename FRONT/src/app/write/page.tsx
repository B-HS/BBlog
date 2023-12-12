'use client'
import Flex from '@/components/flex'
import Tiptap from '@/components/tiptap/tiptap'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import useInput from '@/hooks/useInput'
import { useRef, useState } from 'react'

const Write = () => {
    const editor = useRef(null)
    const { toast } = useToast()
    const [tags, setTags] = useState<string[]>([])
    const [tagInput, onChangeTagInput, setTagInput] = useInput()
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

    return (
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
            </Flex>
        </Flex>
    )
}
export default Write
