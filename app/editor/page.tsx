'use client'
import { CustomComponents } from '@/components/mdx/custom-components'
import { FrontmatterProps } from '@/components/mdx/custom-mdx'
import Tags from '@/components/post/tags'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import dayjs from 'dayjs'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { Suspense, useState } from 'react'
import rehypePrettyCode from 'rehype-pretty-code'
import remarkGfm from 'remark-gfm'

const INITIAL_DATA = `---
title: TITLE
tags: ['TAG', 'LIST']
date: YYYYMMDDHHmmss
thumbnail: File name where in /public/image
---`

const Editor = () => {
    const [value, setValue] = useState<string>(INITIAL_DATA)
    const [compiledSource, setCompiledSource] = useState<string>()
    const [frontmatter, setFrontmatter] = useState<Partial<FrontmatterProps>>({})
    const [scope, setScope] = useState<Record<string, unknown>>({})

    const setPreview = async () => {
        const { compiledSource, frontmatter, scope } = await serialize(value, {
            parseFrontmatter: true,
            mdxOptions: {
                development: true,
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

        setCompiledSource(compiledSource)
        setFrontmatter(frontmatter)
        setScope(scope)
    }

    return (
        <Tabs defaultValue='Editor' className='py-5'>
            <TabsList>
                <TabsTrigger value='Editor'>Editor</TabsTrigger>
                <TabsTrigger value='Preview' onClick={() => setPreview()}>
                    Preview
                </TabsTrigger>
            </TabsList>
            <TabsContent value='Editor'>
                <section className='py-5'>
                    <Textarea rows={30} value={value} onChange={(e) => setValue(e.target.value)} />
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
        </Tabs>
    )
}

export default Editor
