import { ElementType, ReactNode } from 'react'

export const InfoListItem = ({ Icon, text, link }: { Icon: ElementType; text: string; link?: string }) => (
    <section className='flex items-center gap-2 text-muted-foreground'>
        <Icon className='size-3' />
        {link ? (
            <a href={link} className='hover:underline'>
                {text}
            </a>
        ) : (
            text
        )}
    </section>
)
