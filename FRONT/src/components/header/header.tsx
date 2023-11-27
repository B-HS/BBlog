import { cn } from '@/lib/utils'
import Link from 'next/link'
import Flex from '../flex'
import CollapsibleSidebar from '../sidebar/collapsibleSidebar'
import UpdownAnime from '../transition/updown'
import Search from './icons/search'
import Theme from './icons/theme'
import User from './icons/user'

const Header = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <nav className={cn('fixed w-full bg-background z-50 flex justify-between items-center space-x-4 lg:space-x-6 h-14', className)} {...props}>
            <UpdownAnime>
                <Flex className='gap-2 items-center'>
                    <CollapsibleSidebar />
                    <Link href='/' className='flex items-baseline gap-2 p-0'>
                        <span className='text-lg font-bold whitespace-nowrap'>BLOGTITLE</span>
                        <span className='text-[0.7rem] opacity-70'>SUBTITLE</span>
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
}

export default Header
