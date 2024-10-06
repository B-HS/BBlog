import { VideoComponent } from '@shared/player'
import { LinkIcon } from 'lucide-react'
import { MDXComponents } from 'mdx/types'
import Link from 'next/link'
import { DetailedHTMLProps, HTMLAttributes, createElement } from 'react'

const HeaderCompoenet = (level: number) => {
    const HeaderComponent = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
        const Tag = `h${level}`
        const id = props.children?.toString()?.replaceAll(' ', '-').toLowerCase()

        return (
            <Link className='no-underline heading-url' id={id} href={`#${id}`}>
                {createElement(
                    Tag,
                    { ...props },
                    <section className='flex items-center gap-2 group'>
                        <LinkIcon className='w-0 h-3.5 group-hover:w-3.5 transition-width duration-300' />
                        {props.children}
                    </section>,
                )}
            </Link>
        )
    }
    HeaderComponent.displayName = `h${level}`
    return HeaderComponent
}

const codeComponent = (props: DetailedHTMLProps<HTMLAttributes<HTMLElement> & { 'data-language'?: string }, HTMLElement>) => {
    return (
        <code className='flex flex-col relative'>
            <span className='absolute top-0 right-0 px-1.5 rounded border capitalize'>{props['data-language']}</span>
            {props.children}
        </code>
    )
}

export const CustomComponents: MDXComponents = {
    h1: HeaderCompoenet(1),
    h2: HeaderCompoenet(2),
    h3: HeaderCompoenet(3),
    h4: HeaderCompoenet(4),
    h5: HeaderCompoenet(5),
    h6: HeaderCompoenet(6),
    code: codeComponent,
    video: VideoComponent,
}
