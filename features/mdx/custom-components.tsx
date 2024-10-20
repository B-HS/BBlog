import { LANGUAGE_LIST } from '@shared/constant'
import { VideoComponent } from '@shared/player'
import { LinkIcon } from 'lucide-react'
import { MDXComponents } from 'mdx/types'
import Image from 'next/image'
import Link from 'next/link'
import { DetailedHTMLProps, HTMLAttributes, createElement } from 'react'

const HeaderCompoenet = (level: number) => {
    const HeaderComponent = (props: DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>) => {
        const Tag = `h${level}`
        const id = props.children?.toString()?.replaceAll(' ', '-').toLowerCase()

        return (
            <Link id={id} href={`#${id}`} className='heading-url'>
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
        <code className='relative flex flex-col p-3 border rounded-sm bg-secondary-foreground dark:bg-secondary text-background dark:text-foreground focus:border-none'>
            {props['data-language'] && (
                <span className='absolute top-2 right-2 px-1.5 rounded-sm p-0.5 border capitalize border-foreground/50'>
                    {LANGUAGE_LIST[(props['data-language'] as keyof typeof LANGUAGE_LIST) || props['data-language']]}
                </span>
            )}
            {props.children}
        </code>
    )
}

const ImageComponent = (props: DetailedHTMLProps<HTMLAttributes<HTMLImageElement>, HTMLImageElement> & { alt?: string; src: string }) => {
    const properties = props.alt?.split('||') || ['image']
    const alt = properties[0]
    const height = Number(properties.find((prop) => prop.includes('h'))?.split('h')[1]) || '300px'
    const width = Number(properties.find((prop) => prop.includes('w'))?.split('w')[1]) || '100%'

    if (height) {
        return (
            <section style={{ width, height }} className='relative flex flex-col items-center justify-center'>
                <Image sizes='15vw' fill src={props.src} alt={alt} className='object-contain size-full' priority={false} />
            </section>
        )
    }

    return <Image fill src={props.src} alt={alt} className='w-full h-full ' />
}

export const CustomComponents: MDXComponents = {
    // @ts-ignore
    img: ImageComponent,
    code: codeComponent,
    video: VideoComponent,
    h1: HeaderCompoenet(1),
    h2: HeaderCompoenet(2),
    h3: HeaderCompoenet(3),
    h4: HeaderCompoenet(4),
    h5: HeaderCompoenet(5),
    h6: HeaderCompoenet(6),
}
