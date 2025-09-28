import { HeaderClientComponents, TooltipIcon, WriteButton } from '@features/common'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { auth } from '@shared/auth'
import { Misskey } from '@shared/icons'
import { BookIcon } from 'lucide-react'
import Link from 'next/link'

export const SiteHeader = async () => {
    const session = await auth()
    return (
        <header className='sticky top-0 z-50 w-full border-b backdrop-blur-sm'>
            <section className='flex items-center justify-between px-3 mx-auto h-14 max-w-(--breakpoint-2xl)'>
                <section className='flex items-center gap-1'>
                    <Link href={'/'} className='text-xl font-bold' prefetch={false}>
                        {process.env.SITE_NAME}
                    </Link>
                </section>
                <nav className='flex items-center gap-2' aria-label='Main navigation'>
                    <WriteButton />
                    <TooltipIcon icon={GitHubLogoIcon} linkUrl='https://github.com/B-HS' tooltipContent='Go to Github' />
                    <HeaderClientComponents isUser={!!session?.user} />
                    {process.env.MISSKEY_INSTANCE_URL && process.env.MISSKEY_USER_ID && <Misskey />}
                    <TooltipIcon icon={BookIcon} linkUrl='/article' tooltipContent='Articles' />
                </nav>
            </section>
        </header>
    )
}
