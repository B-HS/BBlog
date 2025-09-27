'use client'

import { Category, categoryQueries } from '@entities/category'
import { buttonVariants } from '@shared/ui/button'
import { Label } from '@shared/ui/label'
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@shared/ui/navigation-menu'
import { Skeleton } from '@shared/ui/skeleton'
import { useQuery } from '@tanstack/react-query'
import { Dispatch, FC, SetStateAction } from 'react'
import { EditCategoryManageModal } from './edit-category-manage-modal'

type EditCategoryType = { currentCategory?: number; setCurrentCategory: Dispatch<SetStateAction<number | undefined>> }

export const EditCategory: FC<EditCategoryType> = ({ setCurrentCategory, currentCategory }) => {
    const { data: categoryData, isLoading, refetch } = useQuery(categoryQueries.all())

    const categoryList = categoryData?.map((category) => ({
        label: category.category,
        value: category.categoryId,
        isHide: category.isHide,
    }))

    return (
        <section className='w-full'>
            <Label className='text-lg'>Category</Label>
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className='flex items-center gap-2 min-h-[50px] min-w-7'>
                        {isLoading && <Skeleton className='w-14' />}
                        {categoryList
                            ?.filter((category) => !category.isHide)
                            ?.map((category) => (
                                <NavigationMenuLink
                                    key={category.value}
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: currentCategory !== category.value ? 'outline' : 'secondary',
                                        className: 'cursor-pointer',
                                    })}
                                    onClick={() => setCurrentCategory(category.value)}>
                                    {category.label}
                                </NavigationMenuLink>
                            ))}

                        {categoryList
                            ?.filter((category) => category.isHide)
                            ?.map((category) => (
                                <NavigationMenuLink
                                    key={category.value}
                                    className={buttonVariants({
                                        size: 'sm',
                                        variant: currentCategory !== category.value ? 'outline' : 'secondary',
                                        className: 'cursor-pointer opacity-20',
                                    })}
                                    onClick={() => setCurrentCategory(category.value)}>
                                    {category.label}
                                </NavigationMenuLink>
                            ))}
                        <EditCategoryManageModal refetch={refetch} categoryList={categoryList} />
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </section>
    )
}
