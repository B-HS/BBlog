'use client'

// eslint-disable-next-line import/no-named-as-default
import rehypePrettyCode from 'rehype-pretty-code'

import { CustomComponents, remarkContent } from '@features/mdx'
import { TabsContent } from '@radix-ui/react-tabs'
import { getR2UploadList, ImageList, r2Upload } from '@shared/lib'
import { Label } from '@shared/ui/label'
import { Separator } from '@shared/ui/separator'
import { StyledTextarea } from '@shared/ui/styled-textarea'
import { Tabs, TabsList, TabsTrigger } from '@shared/ui/tabs'
import { useToast } from '@shared/ui/use-toast'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import Image from 'next/image'
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import remarkGfm from 'remark-gfm'

type EditDescriptionProps = {
    description: string
    setDescription: Dispatch<SetStateAction<string>>
    setImageObj: Dispatch<SetStateAction<Record<string, string | number>>>
}

export const EditDescription: FC<EditDescriptionProps> = ({ description, setDescription, setImageObj }) => {
    const [r2images, setR2Images] = useState<ImageList[]>([])
    const [compiledSource, setCompiledSource] = useState<string>('')
    const [scope, setScope] = useState<Record<string, unknown>>({})
    const { toast } = useToast()
    const fileInput = useRef<HTMLImageElement>(null)

    const setPreview = async () => {
        const { compiledSource, scope } = await serialize(description, {
            parseFrontmatter: false,
            mdxOptions: {
                development: process.env.NODE_ENV === 'development',
                remarkPlugins: [remarkGfm, remarkContent],
                rehypePlugins: [[rehypePrettyCode, { theme: 'dark-plus' }]],
                format: 'mdx',
            },
        })

        setCompiledSource(compiledSource)
        setScope(scope)
    }

    const loadImageList = async () => {
        setR2Images(await getR2UploadList())
        if (fileInput.current) {
            fileInput.current.nodeValue = null
        }
    }

    useEffect(() => {
        setPreview()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [description])

    return (
        <section>
            <Label className='text-lg'>Description</Label>
            <Tabs defaultValue='edit'>
                <TabsList className='w-fit bg-transparent p-0 flex gap-0.5'>
                    <TabsTrigger className='rounded-none h-full border border-b-0 active:bg-neutral-500' value='edit'>
                        Editing
                    </TabsTrigger>
                    <TabsTrigger className='rounded-none h-full border border-b-0 active:bg-neutral-500' value='preview'>
                        Preview
                    </TabsTrigger>
                    <TabsTrigger className='rounded-none h-full border border-b-0 active:bg-neutral-500' value='images' onClick={loadImageList}>
                        images
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='edit'>
                    <section className='min-h-96 h-[50vh] border rounded-b-sm flex'>
                        <StyledTextarea
                            styling={false}
                            className='w-full ring-offset-transparent ring-0 outline-none border-none p-5'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </section>
                </TabsContent>
                <TabsContent value='preview'>
                    <section className='min-h-96 h-[50vh] border rounded-b-sm flex p-5'>
                        <section className='w-full overflow-scroll markdown-prose'>
                            {compiledSource && (
                                <MDXRemote
                                    lazy={false}
                                    compiledSource={compiledSource}
                                    frontmatter={{ title: '', tag: '11' }}
                                    scope={scope}
                                    components={{ ...CustomComponents }}
                                />
                            )}
                        </section>
                    </section>
                </TabsContent>
                <TabsContent value='images'>
                    <section className='min-h-96 h-[50vh] border rounded-b-sm p-5 overflow-scroll flex flex-col'>
                        <section className='flex flex-col gap-3'>
                            <p className='text-3xl font-bold'>Upload</p>
                            <input onChange={r2Upload(toast, loadImageList)} type='file' ref={fileInput as any} />
                        </section>
                        <Separator className='my-10' />
                        <section className='flex flex-col gap-3'>
                            <p className='text-3xl font-bold'>Image list</p>
                            <section className='grid grid-cols-3 gap-2'>
                                {r2images.length > 0 &&
                                    r2images.map((image) => (
                                        <Image
                                            className='border hover:-translate-y-2 transition-transform cursor-pointer w-full h-full'
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
                    </section>
                </TabsContent>
            </Tabs>
        </section>
    )
}
