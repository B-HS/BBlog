'use client'

import { Github } from '@ui/icons/github'
import { ThemeChanger } from '@features/theme/theme-changer'
import { buttonVariants } from '@ui/button'
import { cn } from '@lib/utils'
import { Book, MessageCircleMore } from 'lucide-react'
import Link from 'next/link'
import { FC, Suspense } from 'react'
import { AuthenticatedNavs } from './auth-nav'

interface LayoutHeaderProps {
    className?: string
}

export const LayoutHeader: FC<LayoutHeaderProps> = ({ className }) => {
    return (
        <header className={cn('sticky top-0 z-50 h-12 px-2 lg:px-1 flex items-center justify-between backdrop-blur-xs bg-background/50', className)}>
            <Link href='/'>
                <h1 className='font-extrabold text-xl'>Hyunseok</h1>
            </Link>
            <nav className='flex items-center gap-1'>
                <Suspense>
                    <AuthenticatedNavs />
                </Suspense>
                <ThemeChanger />
                <Link
                    href='https://github.com/B-HS'
                    className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'dark:invert' })}
                    aria-label='GitHub 프로필'>
                    <Github />
                </Link>
                <Link href='/log' className={buttonVariants({ variant: 'ghost', size: 'icon' })} aria-label='로그 페이지'>
                    <MessageCircleMore />
                </Link>
                <Link href='/article' className={buttonVariants({ variant: 'ghost', size: 'icon' })} aria-label='아티클 목록'>
                    <Book />
                </Link>
            </nav>
        </header>
    )
}
