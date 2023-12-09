'use client'
import { getAllPost } from '@/api/article/post'
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
    const [postCount, setPostCount] = useState<Record<string, number>>({})

    useEffect(() => {
        const loadMenuInfo = async () => {
            setMenu(await loadMenu())
            setPostCount(await getAllPost(true, true))
        }
        loadMenuInfo()
    }, [])

    const createMenuHierarchy = (menuItems: MenuItem[], parentKey: number = 0): Record<string, any>[] => {
        if (!Array.isArray(menuItems)) return []
        const filteredItems = menuItems.filter((item) => item.parentmekey === parentKey).sort((a, b) => a.meorder - b.meorder)
        return filteredItems.map((item: MenuItem) => ({
            mekey: item.mekey,
            mename: item.mename,
            hide: item.hide,
            icon: item.icon,
            parentmekey: item.parentmekey,
            meorder: item.meorder,
            children: createMenuHierarchy(menuItems, item.mekey),
        }))
    }

    const flattenMenuHierarchy = (menuItems: MenuItem[], targetParentKey: number): number[] => {
        const targetParent = menuItems.find((item) => item.mekey === targetParentKey)
        if (!targetParent) return []
        const children = menuItems.filter((item) => item.parentmekey === targetParentKey).sort((a, b) => a.meorder - b.meorder)
        return [targetParent.mekey, ...children.map((item) => item.mekey)]
    }

    const getMenuCount = (target: number[]) => {
        return target.map((ele) => postCount[`ME_${ele}`] || 0).reduce((prev, next) => prev + next, 0)
    }

    const Menu = () => {
        return createMenuHierarchy(menu).map((me) => (
            <UpdownAnime key={me.mekey} delay={DELAY(2)}>
                <div>
                    <MenuCategory key={me.mekey} title={me.mename} count={getMenuCount(flattenMenuHierarchy(menu, me.mekey))} />
                    {me.children?.map((category: MenuItem) => (
                        <MenuElement key={category.mekey} title={category.mename} count={getMenuCount([category.mekey])} />
                    ))}
                </div>
            </UpdownAnime>
        ))
    }

    return <Flex className={cn('flex-col', className)}>{Menu()}</Flex>
}

export default Menu
