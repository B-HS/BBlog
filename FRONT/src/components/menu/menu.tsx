'use client'
import { loadMenu } from '@/api/menu/menu'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import Flex from '../flex'
import MenuCategory from './menuCategory'
import MenuElement from './menuElement'

const Menu = ({ className }: React.HTMLAttributes<HTMLElement>) => {
    const [menu, setMenu] = useState<Record<string, any>[]>([])
    const loadMenuList = async () => setMenu(await loadMenu())
    useEffect(() => {
        loadMenuList()
    }, [])
    const isHasChildren = (mekey: number) => menu.filter((ele) => ele.parentmekey === mekey).length === 0
    return (
        <Flex className={cn('flex-col', className)}>
            {/* TODO 읽기는 진짜 쉬운데 시간 복잡도가 매우 커 보임 (메뉴개수, 대상메뉴, depth) 리펙터링 필요*/}
            {menu.map((me) =>
                isHasChildren(me.mekey) ? (
                    <MenuElement key={me.mekey} title={me.mename} count={10} />
                ) : (
                    <MenuCategory key={me.mekey} title={me.mename} count={10} />
                ),
            )}
        </Flex>
    )
}

export default Menu
