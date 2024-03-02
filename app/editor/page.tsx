'use client'
import { CustomComponents } from '@/components/mdx/custom-components'
import { FrontmatterProps } from '@/components/mdx/custom-mdx'
import Tags from '@/components/post/tags'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useToast } from '@/components/ui/use-toast'

import { ImageList, getR2UploadList, r2Upload } from '@/lib/r2image'
import dayjs from 'dayjs'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Image from 'next/image'
import { Suspense, useRef, useState } from 'react'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

const INITIAL_DATA = `---
category: 'HELLO'
title: TITLE
tags: ['TAG', 'LIST']
date: '${dayjs().format('YYYYMMDDhhmmss')}'
thumbnail: https://img.gumyo.net/ or /image/image.png
---`

const Editor = () => {
    const fileInput = useRef<HTMLImageElement>(null)
    const { toast } = useToast()
    const [value, setValue] = useState<string>(INITIAL_DATA)
    const [compiledSource, setCompiledSource] = useState<string>()
    const [frontmatter, setFrontmatter] = useState<Partial<FrontmatterProps>>({})
    const [scope, setScope] = useState<Record<string, unknown>>({})
    const [imageObj, setImageObj] = useState<Record<string, string | number>>({
        src: '',
        alt: '',
        width: '',
        height: '',
        imgInput: '',
    })
    const [r2images, setR2Images] = useState<ImageList[]>([])
    const [tempPosts, setTempPosts] = useState<string[]>([])

    const setPreview = async () => {
        const { compiledSource, frontmatter, scope } = await serialize(value, {
            parseFrontmatter: true,
            mdxOptions: {
                // Change it to true if app running on dev mode
                development: false,
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    [
                        // @ts-ignore
                        rehypePrettyCode,
                        {
                            theme: 'dark-plus',
                        },
                    ],
                ],
                format: 'mdx',
            },
        })
        savePostTemporary()
        setCompiledSource(compiledSource)
        setFrontmatter(frontmatter)
        setScope(scope)
    }

    const generateImageTag = () => {
        setImageObj((obj) => {
            navigator.clipboard.writeText(`<img src="${obj.src}" alt="${obj.alt}" width="${obj.width}" height="${obj.height}"/>`)
            toast({
                title: 'Copied to clipboard',
                description: 'Image tag copied to clipboard',
            })
            return {
                ...obj,
                imgInput: `<img src="${obj.src}" alt="${obj.alt}" width="${obj.width}" height="${obj.height}"/>`,
            }
        })
    }

    const loadImageList = async () => {
        savePostTemporary()
        setR2Images(await getR2UploadList())
        if (fileInput.current) {
            fileInput.current.nodeValue = null
        }
    }

    const getAllTempPostList = () => {
        savePostTemporary()
        if (typeof window !== 'undefined') {
            const rawData = Object.keys(localStorage).filter((key) => 'post-' === key.substring(0, 5)) as string[]
            setTempPosts(rawData.sort((a, b) => dayjs(b.substring(0, 5)).valueOf() - dayjs(a.substring(0, 5)).valueOf()))
        }
    }

    const savePostTemporary = async () => {
        if (!value || value === INITIAL_DATA) {
            toast({
                title: 'Empty post',
                description: 'Please write something',
            })
            return
        }
        localStorage.setItem('post-' + dayjs().format('YYYYMMDDhhmmss'), value)
    }
    const loadTempPost = (postname: string) => {
        const data = localStorage.getItem(postname)?.toString() || undefined
        if (!data) {
            toast({
                title: 'Empty post',
                description: 'There is no saved post',
            })
            return
        }
        setValue(data)
    }
    const loadPostContextByPostname = (postname: string) => {
        const data = localStorage.getItem(postname)?.toString() || undefined
        if (!data) {
            toast({
                title: 'Empty post',
                description: 'There is no saved post',
            })
            return
        }
        return data
    }

    const removeAllTempPost = () => {
        if (typeof window !== 'undefined') {
            Object.keys(localStorage)
                .filter((key) => 'post-' === key.substring(0, 5))
                .forEach((key) => localStorage.removeItem(key))
        }
        getAllTempPostList()
    }

    return (
        <section className='flex flex-col'>
            <Tabs defaultValue='Editor' className='my-5'>
                <TabsList>
                    <TabsTrigger value='Editor'>Editor</TabsTrigger>
                    <TabsTrigger value='Images' onClick={() => loadImageList()}>
                        Images
                    </TabsTrigger>
                    <TabsTrigger value='Preview' onClick={() => setPreview()}>
                        Preview
                    </TabsTrigger>
                    <TabsTrigger value='Saved Post' onClick={() => getAllTempPostList()}>
                        Saved Post
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='Editor'>
                    <section className='pt-5 pb-2.5'>
                        <Textarea rows={30} value={value} onChange={(e) => setValue(e.target.value)} />
                    </section>
                    <section className='flex flex-col gap-2'>
                        <Button variant={'outline'} onClick={savePostTemporary}>
                            Save Post Temporary
                        </Button>
                    </section>
                </TabsContent>
                <TabsContent value='Preview'>
                    <section className='prose prose-neutral dark:prose-invert container max-w-screen-lg py-7 bg-neutral-50 dark:bg-neutral-900 rounded my-5'>
                        <section className='flex justify-between items-center flex-wrap'>
                            <section className='flex items-center space-x-2 h-5'>
                                <Badge variant={'outline'}>{frontmatter?.category}</Badge>
                                <Separator orientation='vertical' />
                                <span className='text-xl font-bold'>{frontmatter?.title}</span>
                            </section>

                            <section className='flex items-center space-x-2 h-5'>
                                <span>{dayjs(frontmatter?.date).format('YYYY-MM-DD')}</span>
                                <Separator orientation='vertical' />
                                <span>{frontmatter?.viewCnt} views</span>
                            </section>
                        </section>
                        <Separator className='my-2' />
                        <section className='flex flex-wrap gap-2 py-3 justify-end'>
                            <Tags tags={frontmatter?.tags} />
                        </section>
                        <Suspense>
                            {compiledSource && (
                                <MDXRemote
                                    lazy={false}
                                    compiledSource={compiledSource}
                                    frontmatter={frontmatter}
                                    scope={scope}
                                    components={{ CustomComponents }}
                                />
                            )}
                        </Suspense>
                    </section>
                </TabsContent>
                <TabsContent value='Images' className='flex flex-col gap-7'>
                    <section className='flex flex-col gap-3'>
                        <p className='text-3xl font-bold'>Image list</p>
                        <section className='flex gap-3 flex-wrap justify-start'>
                            {r2images.length > 0 &&
                                r2images.map((image) => (
                                    <Image
                                        className='border hover:-translate-y-2 transition-transform cursor-pointer'
                                        key={image.name}
                                        src={image.url}
                                        alt={image.name}
                                        width={200}
                                        height={200}
                                        onClick={() => setImageObj((obj) => ({ ...obj, src: image.url, alt: image.name }))}
                                    />
                                ))}
                        </section>
                    </section>
                    <section className='flex flex-col gap-3'>
                        <p className='text-3xl font-bold'>Upload</p>
                        <input onChange={r2Upload(toast, loadImageList)} type='file' ref={fileInput as any} />
                    </section>
                </TabsContent>
                <TabsContent value='Saved Post'>
                    <section className='flex flex-col gap-3'>
                        <section className='flex justify-between'>
                            <p className='text-3xl font-bold'>Saved Post</p>
                            <Button variant={'destructive'} onClick={removeAllTempPost}>
                                Remove All
                            </Button>
                        </section>
                        <Separator />
                        <section className='flex gap-3 flex-wrap justify-start'>
                            {tempPosts.map((post, idx) => (
                                <TooltipProvider key={idx}>
                                    <Tooltip>
                                        <TooltipTrigger>
                                            <Button variant={'outline'} onClick={() => loadTempPost(post)}>
                                                {dayjs(post.substring(5, 19), { format: 'YYYYMMDDHHmmss' }).format('YYYY-MM-DD HH:mm:ss')}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{loadPostContextByPostname(post)}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            ))}
                        </section>
                    </section>
                </TabsContent>
            </Tabs>
            <section className='flex flex-col gap-2 mb-5'>
                <p>Generate Image Tag</p>
                <section className='flex gap-2'>
                    <Input placeholder='Image URL' value={imageObj.src} onChange={(e) => setImageObj((obj) => ({ ...obj, src: e.target.value }))} />
                    <Input placeholder='Image Alt' value={imageObj.alt} onChange={(e) => setImageObj((obj) => ({ ...obj, alt: e.target.value }))} />
                    <Input
                        placeholder='Image Width'
                        value={imageObj.width}
                        onChange={(e) => setImageObj((obj) => ({ ...obj, width: e.target.value }))}
                    />
                    <Input
                        placeholder='Image Height'
                        value={imageObj.height}
                        onChange={(e) => setImageObj((obj) => ({ ...obj, height: e.target.value }))}
                    />
                </section>

                <section className='flex gap-2'>
                    <Input value={imageObj.imgInput} disabled />
                    <Button variant={'outline'} onClick={generateImageTag}>
                        Generate Image Tag
                    </Button>
                </section>
            </section>
        </section>
    )
}

export default Editor
