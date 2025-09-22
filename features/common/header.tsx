import { Github } from '@/shared/icon/github'
import { BookIcon, ScrollText } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import { IconButton } from './icon-button'

const HeaderLinks = [
    {
        linkUrl: 'https://resume.gumyo.net',
        tooltipContent: 'Resume',
        icon: <ScrollText />,
    },
    {
        linkUrl: '/misskey',
        tooltipContent: 'Misskey',
        iconSrc: 'https://img.gumyo.net/misskeyicon.png',
    },
    {
        linkUrl: '/github',
        tooltipContent: 'Github',
        icon: <Github />,
    },
    {
        linkUrl: '/post',
        tooltipContent: 'Posts',
        icon: <BookIcon />,
    },
]

export const Header: FC = () => {
    return (
        <header className='flex items-center justify-between'>
            <Link className='text-xl font-bold px-1.5 flex items-center' href='/'>
                Hyunseok
            </Link>
            <nav className='flex items-center gap-2'>
                {HeaderLinks.map((link) => (
                    <IconButton key={link.linkUrl} {...link} />
                ))}
            </nav>
        </header>
    )
}
