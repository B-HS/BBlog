import { cn } from '@/lib/utils'
import Flex from '../flex'
import MenuCategory from './menuCategory'
import MenuElement from './menuElement'

const Menu = ({ className }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <Flex className={cn('flex-col', className)}>
            <MenuCategory title='Category 1' count='10' />
            <MenuElement title='Element 1' count='10' />
        </Flex>
    )
}

export default Menu
