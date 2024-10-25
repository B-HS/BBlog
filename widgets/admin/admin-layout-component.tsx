'use client'
import { ReactNode } from 'react'

import { LayoutBreadcrumb, Menubar } from '@features/admin'
import { ScrollArea } from '@shared/ui/scroll-area'
import { SidebarInset, SidebarProvider } from '@shared/ui/sidebar'

export const LayoutContent = ({ children }: { children: ReactNode }) => {
    return (
        <SidebarProvider className='!h-full !min-h-full'>
            <Menubar />
            <SidebarInset noSvhAndFlex className='size-full'>
                <ScrollArea className='flex flex-col h-full'>
                    <LayoutBreadcrumb />
                    <div className='flex flex-1 flex-col gap-4 p-4'>{children}</div>
                </ScrollArea>
            </SidebarInset>
        </SidebarProvider>
    )
}
