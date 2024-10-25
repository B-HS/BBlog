'use client'
import { Fragment } from 'react'

import { extractMenuPath, useSidebarStore } from '@entities/admin'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@shared/ui/breadcrumb'
import { Separator } from '@shared/ui/separator'
import { SidebarTrigger } from '@shared/ui/sidebar'

export const LayoutBreadcrumb = () => {
    const { currentMenu } = useSidebarStore()
    return (
        <header className='flex items-center gap-2 border-b pb-5 pt-2'>
            <div className='flex items-center gap-2 px-3'>
                <SidebarTrigger />
                <Separator orientation='vertical' className='mr-2 h-4' />
                <Breadcrumb>
                    <BreadcrumbList>
                        {extractMenuPath(currentMenu).map((menu, index) => (
                            <Fragment key={index}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink href='#'>
                                        <span className='font-bold'>{menu}</span>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index !== currentMenu.length - 1 && <BreadcrumbSeparator className='hidden md:block' />}
                            </Fragment>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}
