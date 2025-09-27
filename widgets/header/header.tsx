import { TooltipIcon, WriteButton } from '@features/common'
import { DotsHorizontalIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { Misskey } from '@shared/icons'
import { buttonVariants } from '@shared/ui/button'
import { BookIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const AdminWidget = dynamic(() => import('@widgets/admin').then((comp) => comp.AdminWidget), {
    loading: () => <DotsHorizontalIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} />,
})
const ScrollStatus = dynamic(() => import('@features/common').then((comp) => comp.ScrollStatus), {
    loading: () => <DotsHorizontalIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} />,
})
const ThemeChanger = dynamic(() => import('@features/common').then((comp) => comp.ThemeChanger), {
    loading: () => <DotsHorizontalIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} />,
})

export const SiteHeader = async () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b backdrop-blur-sm'>
            <section className='flex items-center justify-between px-3 mx-auto h-14 max-w-(--breakpoint-2xl)'>
                <section className='flex items-center gap-1'>
                    <Link href={'/'} className='text-xl font-bold' prefetch={false}>
                        {process.env.SITE_NAME}
                    </Link>
                </section>
                <nav className='flex items-center gap-2' aria-label='Main navigation'>
                    <AdminWidget />
                    <WriteButton />
                    <TooltipIcon icon={GitHubLogoIcon} linkUrl='https://github.com/B-HS' tooltipContent='Go to Github' />
                    <ThemeChanger />
                    {process.env.MISSKEY_INSTANCE_URL && process.env.MISSKEY_USER_ID && <Misskey />}
                    <TooltipIcon icon={BookIcon} linkUrl='/article' tooltipContent='Articles' />
                </nav>
            </section>
            <ScrollStatus />
        </header>
    )
}
