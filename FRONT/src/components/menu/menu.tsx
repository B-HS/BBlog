'use client'
import { loadMenu } from '@/api/menu/menu'
import { DELAY } from '@/lib/constant'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Flex from '../flex'
import UpdownAnime from '../transition/updown'
import MenuCategory from './menuCategory'
import MenuElement from './menuElement'

export interface MenuItem {
    mekey: number
    mename: string
    parentmekey: number
    meorder: number
    hide: boolean
    icon: string | null
    children?: MenuItem[]
}

const Menu = ({ className }: React.HTMLAttributes<HTMLElement>) => {
    const [menu, setMenu] = useState<MenuItem[]>([])

    useEffect(() => {
        const loadMenuList = async () => {
            setMenu(await loadMenu())
        }
        loadMenuList()
    }, [])

    const createMenuHierarchy = (menuItems: MenuItem[], parentKey: number = 0): Record<string, any>[] => {
        if (!Array.isArray(menuItems)) return []
        const filteredItems = menuItems.filter((item) => item.parentmekey === parentKey).sort((a, b) => a.meorder - b.meorder)
        return filteredItems.map((item: MenuItem) => ({
            mekey: item.mekey,
            mename: item.mename,
            hide: item.hide,
            icon: item.icon,
            children: createMenuHierarchy(menuItems, item.mekey),
        }))
    }

    const Menu = () => {
        return createMenuHierarchy(menu).map((me) => (
            <UpdownAnime key={me.mekey} delay={DELAY(2)}>
                <div>
                    <MenuCategory key={me.mekey} title={me.mename} />
                    {me.children && me.children.map((category: Record<string, any>) => <MenuElement key={category.mekey} title={category.mename} />)}
                </div>
            </UpdownAnime>
        ))
    }

    return <Flex className={cn('flex-col', className)}>{Menu()}</Flex>
}

export default Menu
