'use client'

import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@ui/sidebar'
import { FileText, MessageSquare, Users } from 'lucide-react'
import { FC } from 'react'

interface AdminSidebarProps {
    activeTab: string
    onTabChange: (tab: string) => void
}

export const AdminSidebar: FC<AdminSidebarProps> = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { id: 'users', label: '사용자 관리', icon: Users },
        { id: 'posts', label: '게시글 관리', icon: FileText },
        { id: 'comments', label: '댓글 관리', icon: MessageSquare },
    ]

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>관리자 패널</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {menuItems.map((item) => (
                                <SidebarMenuItem key={item.id}>
                                    <SidebarMenuButton
                                        onClick={() => onTabChange(item.id)}
                                        isActive={activeTab === item.id}
                                        tooltip={item.label}>
                                        <item.icon className='size-3.5' />
                                        <span>{item.label}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
