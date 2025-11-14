'use client'

import { SidebarProvider, SidebarTrigger } from '@ui/sidebar'
import { AdminSidebar } from '@widgets/admin/admin-sidebar'
import { CommentsTable } from '@widgets/admin/comments-table'
import { PostsTable } from '@widgets/admin/posts-table'
import { UsersTable } from '@widgets/admin/users-table'
import { FC, useState } from 'react'

export const AdminPanel: FC = () => {
    const [activeTab, setActiveTab] = useState('users')

    const renderContent = () => {
        switch (activeTab) {
            case 'users':
                return (
                    <div className='flex flex-col gap-3.5'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>사용자 관리</h2>
                            <p className='text-muted-foreground'>모든 사용자 목록을 확인하고 관리합니다.</p>
                        </div>
                        <UsersTable />
                    </div>
                )
            case 'posts':
                return (
                    <div className='flex flex-col gap-3.5'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>게시글 관리</h2>
                            <p className='text-muted-foreground'>모든 게시글(숨김글 포함)을 확인하고 관리합니다.</p>
                        </div>
                        <PostsTable />
                    </div>
                )
            case 'comments':
                return (
                    <div className='flex flex-col gap-3.5'>
                        <div>
                            <h2 className='text-2xl font-bold tracking-tight'>댓글 관리</h2>
                            <p className='text-muted-foreground'>모든 댓글을 확인하고 관리합니다. 게시글 제목을 클릭하면 해당 댓글로 이동합니다.</p>
                        </div>
                        <CommentsTable />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <SidebarProvider>
            <div className='flex h-screen w-full'>
                <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />
                <main className='flex-1 overflow-y-auto'>
                    <div className='sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
                        <div className='flex h-12 items-center gap-3.5 px-3.5'>
                            <SidebarTrigger />
                            <h1 className='text-lg font-semibold'>관리자 패널</h1>
                        </div>
                    </div>
                    <div className='p-6'>{renderContent()}</div>
                </main>
            </div>
        </SidebarProvider>
    )
}
