'use client'
import { ReactElement } from 'react'

import { RouterComponents, useSidebarStore } from '@entities/admin'

export const RenderComponent = (menuPath: string[], components: any): ReactElement | null => {
    if (!menuPath.length) return null
    const [current, ...nextMenuPath] = menuPath

    if (components[current]) {
        return nextMenuPath.length > 0 ? RenderComponent(nextMenuPath, components[current]) : components[current]()
    }

    return null
}

export const LayoutRoutingComponent = () => {
    const { currentMenu } = useSidebarStore()
    return <div>{RenderComponent(currentMenu, RouterComponents) || <div>Component Not Found</div>}</div>
}
