import { MenuItem } from '@/components/menu/menu'

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
        type: item.type,
        children: createMenuHierarchy(menuItems, item.mekey),
    }))
}

const flattenMenuHierarchy = (menuItems: MenuItem[], targetParentKey: number): number[] => {
    const targetParent = menuItems.find((item) => item.mekey === targetParentKey)
    if (!targetParent) return []
    const children = menuItems.filter((item) => item.parentmekey === targetParentKey).sort((a, b) => a.meorder - b.meorder)
    return [targetParent.mekey, ...children.map((item) => item.mekey)]
}

const getMenuNameWithChildrensName = (currentMename: string, menulist: MenuItem[]) => {
    const result = []
    const currentObject = menulist.find((obj) => obj.mename.toLowerCase() === currentMename.toLowerCase())
    if (currentObject) {
        result.push(currentObject.mename)
        const children = menulist.filter((obj) => obj.parentmekey === currentObject.mekey)
        children.forEach((child) => {
            result.push(...getMenuNameWithChildrensName(child.mename, menulist))
        })
    }

    return result
}
export { createMenuHierarchy, flattenMenuHierarchy, getMenuNameWithChildrensName }
