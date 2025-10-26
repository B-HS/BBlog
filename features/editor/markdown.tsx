import { Image } from '@ui/image'
import { CodeBlock } from '../common/code-block'
import type { Element, Root } from 'hast'
import { defaultSchema, type Schema } from 'hast-util-sanitize'
import { toString } from 'hast-util-to-string'
import { ComponentProps, ReactElement, ReactNode } from 'react'
import { Fragment, jsx, jsxs } from 'react/jsx-runtime'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeHighlight from 'rehype-highlight'
import rehypeReact from 'rehype-react'
import rehypeSanitize from 'rehype-sanitize'
import rehypeSlug from 'rehype-slug'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import { cn } from '@lib/utils'

type TocItem = { depth: number; id: string; text: string }

export const toHTMLWithTOC = async (markdown: string) => {
    const toc: TocItem[] = []

    const schema: Schema = {
        ...defaultSchema,
        tagNames: [...(defaultSchema.tagNames ?? []), 'picture', 'source'],
        attributes: {
            ...defaultSchema.attributes,
            code: [...(defaultSchema.attributes?.code ?? []), ['className', /^language-/]],
            span: [...(defaultSchema.attributes?.span ?? []), ['className', /^hljs-?[\w-]*/]],
            a: [
                ...(defaultSchema.attributes?.a ?? []),
                'rel',
                ['rel', 'nofollow'],
                ['rel', 'noopener'],
                ['rel', 'noreferrer'],
                ['target', '_blank'],
                ['target', '_self'],
                ['target', '_parent'],
                ['target', '_top'],
                ['ariaHidden', 'true'],
                ['ariaHidden', 'false'],
                ['tabIndex', -1],
                ['tabIndex', 0],
                ['className', 'heading-link'],
            ],
            h1: ['id'],
            h2: ['id'],
            h3: ['id'],
            h4: ['id'],
            h5: ['id'],
            h6: ['id'],
            img: [...(defaultSchema.attributes?.img ?? []), 'loading', 'decoding', 'style', 'width', 'height', 'className'],
            picture: ['style'],
            source: ['media', 'srcSet', 'type'],
        },
    }

    const rehypeCollectToc = () => (tree: Root) => {
        visit(tree, 'element', (node: Element) => {
            const tag = node.tagName
            if (typeof tag === 'string' && /^h[1-6]$/.test(tag)) {
                const id = node.properties?.id as string | undefined
                if (!id) return
                const depth = Number(tag.slice(1))
                const text = toString(node).trim()
                toc.push({ depth, id, text })
            }
        })
    }
    const rehypeWrapTables = () => (tree: Root) => {
        visit(tree, 'element', (node: Element, index, parent) => {
            if (node.tagName === 'table' && parent && Array.isArray(parent.children) && typeof index === 'number') {
                parent.children[index] = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                        className: ['table-wrapper'],
                    },
                    children: [node],
                } as Element
            }
        })
    }

    const rehypeProcessImages = () => (tree: Root) => {
        visit(tree, 'element', (node: Element) => {
            if (node.tagName === 'img') {
                const src = node.properties?.src as string | undefined
                let alt = node.properties?.alt as string | undefined

                if (!src) return

                let customWidth: number | undefined
                let customHeight: number | undefined
                let customClass: string | undefined

                if (alt) {
                    const widthMatch = alt.match(/width:(\d+)/)
                    const heightMatch = alt.match(/height:(\d+)/)
                    const classMatch = alt.match(/class:'([^']+)'/)

                    if (widthMatch) {
                        customWidth = parseInt(widthMatch[1])
                    }
                    if (heightMatch) {
                        customHeight = parseInt(heightMatch[1])
                    }
                    if (classMatch) {
                        customClass = classMatch[1]
                    }

                    alt = alt.replace(/\{[^}]+\}/, '').trim()
                }

                node.properties = {
                    ...node.properties,
                    src,
                    alt: alt || '',
                    width: customWidth,
                    height: customHeight,
                    className: customClass,
                }
            }
        })
    }

    const file = await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkBreaks)
        .use(remarkRehype, { allowDangerousHtml: false })
        .use(rehypeSlug)
        .use(rehypeExternalLinks, { target: '_blank', rel: ['nofollow', 'noopener', 'noreferrer'] })
        .use(rehypeProcessImages)
        .use(rehypeSanitize, schema)
        .use(rehypeAutolinkHeadings, {
            behavior: 'wrap',
            properties: { className: ['heading-link'], ariaHidden: 'false', tabIndex: 0 },
        })
        .use(rehypeCollectToc)
        .use(rehypeWrapTables)
        .use(rehypeHighlight, { detect: true })
        .use(rehypeReact, {
            jsx,
            jsxs,
            Fragment,
            components: {
                img: (props: ComponentProps<typeof Image>) => (
                    <span
                        className={cn('relative size-full inline-block', props.className)}
                        style={{ width: '100%', height: props.height || '300px' }}>
                        <Image
                            src={props.src || ''}
                            alt={props.alt || ''}
                            fill
                            sizes='(max-width: 400px) 400px, (max-width: 640px) 640px, 1024px'
                            className='object-contain'
                            priority
                        />
                    </span>
                ),
                pre: (props: { children: ReactElement<{ className: string; children: ReactNode }> }) => {
                    const language = props.children.props.className.replace('language-', '') || 'text'
                    const codeText = props.children.props.children || ''
                    return <CodeBlock language={language.toUpperCase()} code={codeText} />
                },
            },
        })
        .process(markdown)

    return { content: file.result, toc } as { content: ReactNode; toc: TocItem[] }
}
