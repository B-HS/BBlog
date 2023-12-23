'use client'
import { getAllPost } from '@/api/article/post'
import { loadMenu } from '@/api/menu/menu'
import { DELAY } from '@/lib/constant'
import { createMenuHierarchy, flattenMenuHierarchy } from '@/lib/menu'
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
    type: string
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

    const getMenuCount = (target: number[]) => {
        return target.map((ele) => postCount[`ME_${ele}`] || 0).reduce((prev, next) => prev + next, 0)
    }

    const childrenRendering = (category: MenuItem, pl = 0): JSX.Element => {
        return (
            <div key={category.mekey} className={`pl-${pl}`}>
                <MenuElement key={category.mekey} title={category.mename} count={getMenuCount([category.mekey])} />
                {category.children?.map((subcat: MenuItem) => childrenRendering(subcat, pl + 5))}
            </div>
        )
    }

    return (
        <Flex className={cn('flex-col', className)}>
            {createMenuHierarchy(menu).map(
                (me) =>
                    !me.hide && (
                        <UpdownAnime key={me.mekey} delay={DELAY(2)}>
                            <>
                                <MenuCategory
                                    key={me.mekey}
                                    title={me.mename}
                                    type={me.type}
                                    count={me.type === 'LIST' ? getMenuCount(flattenMenuHierarchy(menu, me.mekey)) : undefined}
                                />
                                {me.children?.map((category: MenuItem) => childrenRendering(category))}
                            </>
                        </UpdownAnime>
                    ),
            )}
        </Flex>
    )
}

export default Menu
