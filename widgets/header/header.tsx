import { TooltipIcon, WriteButton } from '@features/common'
import { DotsHorizontalIcon, GitHubLogoIcon } from '@radix-ui/react-icons'
import { buttonVariants } from '@shared/ui/button'
import { BookIcon } from 'lucide-react'

import dynamic from 'next/dynamic'
import Link from 'next/link'

const ScrollStatus = dynamic(() => import('@features/common').then((comp) => comp.ScrollStatus), { ssr: false })
const ThemeChanger = dynamic(() => import('@features/common').then((comp) => comp.ThemeChanger), {
    ssr: false,
    loading: () => <DotsHorizontalIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} />,
})

export const SiteHeader = async () => {
    return (
        <header className='sticky top-0 z-50 w-full border-b backdrop-blur'>
            <section className='flex h-14 justify-between items-center px-3 max-w-screen-2xl mx-auto'>
                <section className='flex items-center gap-1'>
                    <Link href={'/'} className='text-2xl font-extrabold'>
                        {process.env.SITE_NAME}
                    </Link>
                </section>
                <section className='flex gap-2 items-center'>
                    <WriteButton />
                    <TooltipIcon icon={GitHubLogoIcon} linkUrl='https://github.com/B-HS' tooltipContent='Go to Github' />
                    <ThemeChanger />
                    <TooltipIcon icon={BookIcon} linkUrl='/article' tooltipContent='Articles' />
                </section>
            </section>
            <ScrollStatus />
        </header>
    )
}
