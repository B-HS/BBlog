import { create } from 'zustand'

type Menu = {
    currentMenu: string[]
    // eslint-disable-next-line no-unused-vars
    setRouteList: (currentMenu: string[]) => void
}

type AdminPanelState = {
    isOpen: boolean
    // eslint-disable-next-line no-unused-vars
    setIsOpen: (isOpen: boolean) => void
}

export const RouterList = [
    {
        name: 'Dashboard',
        path: 'dashboard',
    },
    {
        name: 'Article Management',
        path: 'article',
        children: [
            {
                name: 'Article List',
                path: 'list',
            },
        ],
    },
    {
        name: 'Comment Management',
        path: 'comment',
        children: [
            {
                name: 'Comment List',
                path: 'list',
            },
        ],
    },
]

export const useSidebarStore = create<Menu>((set) => ({
    currentMenu: ['dashboard'],
    setRouteList: (currentMenu) => set({ currentMenu }),
}))

export const useAdminPanelStateStore = create<AdminPanelState>((set) => ({
    isOpen: false,
    setIsOpen: (isOpen) => set({ isOpen }),
}))

export const extractMenuPath = (paths: string[]) => {
    const result: string[] = []

    const findPath = (menuList: typeof RouterList, remainingPaths: string[]) => {
        if (remainingPaths.length === 0) return

        const [currentPath, ...nextPaths] = remainingPaths
        menuList.forEach((menu) => {
            if (menu.path === currentPath) {
                result.push(menu.name)
                if (menu.children && nextPaths.length > 0) {
                    findPath(menu.children, nextPaths)
                }
            }
        })
    }

    findPath(RouterList, paths)
    return result
}
