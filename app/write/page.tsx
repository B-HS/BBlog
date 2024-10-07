'use client'

import Editor from '@shared/editor/advanced-editor'
import { Badge, badgeVariants } from '@shared/ui/badge'
import { Input } from '@shared/ui/input'
import { Label } from '@shared/ui/label'
import { cn } from '@shared/utils'
import { useEffect, useState } from 'react'

const WritePage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState<string[]>([])
    const [tagValue, setTagValue] = useState('')

    useEffect(() => {
        console.log(description)
    }, [description])

    return (
        <section className='flex flex-col gap-5 p-2'>
            <section>
                <Label className='text-lg'>Title</Label>
                <Input className='rounded-sm' onChange={(evt) => setTitle(evt.target.value)} value={title} />
            </section>
            <section>
                <Label className='text-lg'>Description</Label>
                <section className='min-h-96 border p-7 rounded-sm'>
                    <Editor onChange={(text) => setDescription(text.markdown)} />
                </section>
            </section>
            <section>
                <section className='flex gap-1 items-baseline'>
                    <Label className='text-lg'>Tags</Label>
                    <span className='text-xs text-neutral-500'>- Tag can be removed by clicking the tag. </span>
                </section>
                <section className='flex flex-wrap items-center w-full gap-2'>
                    {tags.map((tag, idx) => (
                        <Badge
                            variant={'outline'}
                            key={idx}
                            className='rounded-sm cursor-pointer'
                            onClick={() => setTags(tags.filter((t) => t !== tag))}>
                            <section className='flex items-center gap-xs'>{tag}</section>
                        </Badge>
                    ))}
                    <Input
                        placeholder='Enter the tag and press enter'
                        className={cn(badgeVariants({ variant: 'outline' }), 'w-fit rounded-sm h-8')}
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter' && !tags.includes(tagValue) && !!tagValue) {
                                setTags([...tags, tagValue])
                                setTagValue('')
                            }
                        }}
                    />
                </section>
            </section>
        </section>
    )
}

export default WritePage
