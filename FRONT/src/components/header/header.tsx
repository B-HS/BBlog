'use client'
import { adminProfile } from '@/api/user/user'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Flex from '../flex'
import CollapsibleSidebar from '../sidebar/collapsibleSidebar'
import UpdownAnime from '../transition/updown'
import Search from './icons/search'
import Theme from './icons/theme'
import User from './icons/user'

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const [bloginfo, setBloginfo] = useState<Record<string, string | number | boolean>>()
    useEffect(() => {
        const getbloginfo = async () => setBloginfo(await adminProfile())
        getbloginfo()
    }, [])
    return (
        !!bloginfo && (
            <nav
                className={cn('fixed w-full bg-background z-50 flex justify-between items-center space-x-4 lg:space-x-6 h-14', className)}
                {...props}
            >
                <UpdownAnime>
                    <Flex className='gap-2 items-center'>
                        <CollapsibleSidebar />
                        <Link href='/' className='flex items-baseline p-0 gap-1'>
                            <span className='text-xl font-bold whitespace-nowrap'>{bloginfo.title}</span>
                            <span className='text-[0.7rem] opacity-70'>{bloginfo.subtitle}</span>
                        </Link>
                    </Flex>
                </UpdownAnime>
                <UpdownAnime>
                    <Flex className='gap-2 items-center'>
                        <Search />
                        <Theme />
                        <User />
                    </Flex>
                </UpdownAnime>
            </nav>
        )
    )
}

export default Header
