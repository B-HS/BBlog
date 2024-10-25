'use client'

import { RouterList, useSidebarStore } from '@entities/admin'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarRail,
} from '@shared/ui/sidebar'

export const Menubar = () => {
    const { currentMenu, setRouteList } = useSidebarStore()
    return (
        <Sidebar className='h-full overflow-hidden'>
            <SidebarContent className='h-full min-h-auto p-2 my-5'>
                <SidebarGroup>
                    <SidebarMenu>
                        {RouterList.map((route) => (
                            <SidebarMenuItem key={route.name}>
                                <SidebarMenuButton asChild onClick={() => !route.children && setRouteList([route.path])}>
                                    <span className='font-bold cursor-pointer'>{route.name}</span>
                                </SidebarMenuButton>
                                {route.children?.length ? (
                                    <SidebarMenuSub>
                                        {route.children.map((subRoute) => (
                                            <SidebarMenuSubItem key={subRoute.name}>
                                                <SidebarMenuSubButton
                                                    asChild
                                                    onClick={() => setRouteList([route.path, subRoute.path])}
                                                    isActive={currentMenu.includes(route.path) && currentMenu.includes(subRoute.path)}>
                                                    <span className='cursor-pointer'>{subRoute.name}</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                ) : null}
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    )
}
