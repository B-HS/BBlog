import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { FC, useState } from 'react'

import { DialogDescription } from '@radix-ui/react-dialog'
import { Button, buttonVariants } from '@shared/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@shared/ui/dialog'
import { Input } from '@shared/ui/input'
import { Label } from '@shared/ui/label'
import { NavigationMenuLink } from '@shared/ui/navigation-menu'
import { useToast } from '@shared/ui/use-toast'
import { cn } from '@shared/utils'
import { Plus } from 'lucide-react'

type EditorCategoryManageModal = {
    categoryList?: {
        label: string
        value: number
        isHide: boolean
    }[]
    refetch: (options?: RefetchOptions) => Promise<
        QueryObserverResult<
            {
                categoryId: number
                category: string
                isHide: boolean
            }[],
            Error
        >
    >
}

export const EditCategoryManageModal: FC<EditorCategoryManageModal> = ({ refetch, categoryList = [] }) => {
    const { toast } = useToast()
    const [name, setName] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState<number>()

    const handleReactivate = async () => {
        if (!categoryList?.find((category) => category.value === selectedCategory)?.isHide) {
            toast({
                title: 'Category is already active',
                variant: 'destructive',
            })
            return
        }

        if (!selectedCategory) {
            toast({
                title: 'Please select a category to reactivate',
                variant: 'destructive',
            })
            return
        }

        const result = await fetch('/api/category', {
            method: 'PUT',
            body: JSON.stringify({ categoryId: selectedCategory, active: true }),
        })
            .then(async (res) => (await res.json()) as { message: string; categoryId: number })
            .then((json) => ({
                ...json,
                categoryId: selectedCategory,
            }))

        if (selectedCategory == result.categoryId) {
            setSelectedCategory(undefined)
            setName('')
            await refetch()
            toast({
                title: result.message,
                variant: 'default',
            })
        } else {
            toast({
                title: result.message,
                variant: 'destructive',
            })
        }
    }

    const handleRemove = async () => {
        if (!selectedCategory) {
            toast({
                title: 'Please select a category to remove',
                variant: 'destructive',
            })
            return
        }

        const result = await fetch('/api/category', {
            method: 'DELETE',
            body: JSON.stringify({ categoryId: selectedCategory }),
        })
            .then(async (res) => (await res.json()) as { message: string; categoryId: number })
            .then((json) => ({
                ...json,
                categoryId: selectedCategory,
            }))

        if (selectedCategory == result.categoryId) {
            setSelectedCategory(undefined)
            setName('')
            await refetch()
            toast({
                title: result.message,
                variant: 'default',
            })
        } else {
            toast({
                title: result.message,
                variant: 'destructive',
            })
        }
    }

    const handleSave = async () => {
        if (!name) {
            toast({
                title: 'Category name is required',
                variant: 'destructive',
            })
            return
        }

        const result = await fetch('/api/category', {
            method: !selectedCategory ? 'POST' : 'PUT',
            body: JSON.stringify({ name, ...(selectedCategory ? { categoryId: selectedCategory } : {}) }),
        })
            .then(async (res) => (await res.json()) as { message: string; categoryId: number })
            .then((json) => ({
                ...json,
                categoryId: !selectedCategory ? undefined : selectedCategory,
            }))

        if (selectedCategory == result.categoryId) {
            setSelectedCategory(undefined)
            setName('')
            toast({
                title: result.message,
                variant: 'default',
            })
            await refetch()
        } else {
            toast({
                title: result.message,
                variant: 'destructive',
            })
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <NavigationMenuLink className={cn(buttonVariants({ size: 'icon', variant: 'outline' }), 'size-9 p-2 cursor-pointer')}>
                    <Plus />
                </NavigationMenuLink>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle hidden />
                <DialogDescription hidden />
                <section className='flex flex-col gap-3'>
                    <Label className='text-lg'>Category List</Label>
                    <section className='flex flex-wrap items-center gap-2'>
                        {categoryList
                            .filter((category) => !category.isHide)
                            .map((category) => (
                                <Button
                                    key={category.value}
                                    variant={category.value === selectedCategory ? 'secondary' : 'outline'}
                                    size={'sm'}
                                    className='rounded-sm'
                                    onClick={() => {
                                        setSelectedCategory(selectedCategory === category.value ? undefined : category.value)
                                    }}>
                                    {category.label}
                                </Button>
                            ))}
                        {categoryList
                            .filter((category) => category.isHide)
                            .map((category) => (
                                <Button
                                    key={category.value}
                                    variant={category.value === selectedCategory ? 'secondary' : 'outline'}
                                    size={'sm'}
                                    className='rounded-sm opacity-20'
                                    onClick={() => {
                                        setSelectedCategory(selectedCategory === category.value ? undefined : category.value)
                                    }}>
                                    {category.label}
                                </Button>
                            ))}
                    </section>
                    <section>
                        <Label className='text-lg'>{selectedCategory ? 'Edit category' : 'Add Category'}</Label>
                        <section className='flex items-center gap-2'>
                            <Input className='rounded-sm' value={name} onChange={(e) => setName(e.target.value)} />
                            {selectedCategory !== undefined && (
                                <section>
                                    {categoryList.find((category) => category.value === selectedCategory)?.isHide ? (
                                        <Button className='rounded-sm' variant={'destructive'} onClick={handleReactivate}>
                                            Reactivate
                                        </Button>
                                    ) : (
                                        <Button className='rounded-sm' variant={'destructive'} onClick={handleRemove}>
                                            Delete
                                        </Button>
                                    )}
                                </section>
                            )}

                            <Button className='rounded-sm' variant={'outline'} onClick={handleSave}>
                                Save
                            </Button>
                        </section>
                    </section>
                </section>

                <DialogFooter>
                    <Button onClick={() => setIsOpen(false)} type='submit'>
                        Close
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
