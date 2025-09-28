'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { buttonVariants } from '@shared/ui/button'
import dynamic from 'next/dynamic'

const AdminWidget = dynamic(() => import('@widgets/admin').then((comp) => comp.AdminWidget), {
    loading: () => <DotsHorizontalIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} />,
    ssr: false,
})
const ThemeChanger = dynamic(() => import('@features/common').then((comp) => comp.ThemeChanger), {
    loading: () => <DotsHorizontalIcon className={buttonVariants({ variant: 'ghost', size: 'icon', className: 'p-2 cursor-pointer' })} />,
    ssr: false,
})

export const HeaderClientComponents = ({ isUser }: { isUser: boolean }) => {
    return (
        <>
            {isUser && <AdminWidget />}
            <ThemeChanger />
        </>
    )
}
