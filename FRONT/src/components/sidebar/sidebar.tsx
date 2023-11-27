import { cn } from '@/lib/utils'
import Flex from '../flex'
import Menu from '../menu/menu'
import Profile from '../profile/profile'

const Sidebar = ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <Flex
            className={cn('md:flex md:min-w-[280px] md:max-w-[280px] p-0 flex-col gap-1.5 fixed w-0 overflow-hidden transition-all', className)}
            {...props}
        >
            <Profile className='bg-background' />
            <Menu className='bg-background flex-1' />
        </Flex>
    )
}

export default Sidebar
