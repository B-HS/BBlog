'use client'

import { useCreateCategory, useGetCategoryList } from '@entities/category.client'
import { Button } from '@ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { FC, useState } from 'react'

type CategorySelectProps = {
    value?: number
    onChange: (categoryId: number) => void
}

export const CategorySelect: FC<CategorySelectProps> = ({ value, onChange }) => {
    const { data: categories } = useGetCategoryList()
    const createCategory = useCreateCategory()
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const selectedCategory = categories?.find((cat) => cat.categoryId === value)

    const hasExactMatch = categories?.some((cat) => cat.category.toLowerCase() === searchValue.toLowerCase())
    const showCreateButton = searchValue.trim() && !hasExactMatch

    const handleCreate = async () => {
        createCategory.mutate(searchValue, {
            onSuccess: (newCategory) => {
                onChange(newCategory.categoryId)
                setSearchValue('')
                setOpen(false)
            },
        })
    }

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>카테고리</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between h-auto min-h-9'>
                        <span className={selectedCategory ? '' : 'text-muted-foreground'}>
                            {selectedCategory ? selectedCategory.category : '카테고리를 선택하세요'}
                        </span>
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                    <Command>
                        <CommandInput placeholder='카테고리 검색...' value={searchValue} onValueChange={setSearchValue} />
                        <CommandList>
                            <CommandEmpty>카테고리를 찾을 수 없습니다.</CommandEmpty>
                            {showCreateButton && (
                                <CommandGroup>
                                    <CommandItem onSelect={handleCreate} disabled={createCategory.isPending}>
                                        <Plus className='mr-2 h-4 w-4' />
                                        &quot;{searchValue}&quot; 추가
                                    </CommandItem>
                                </CommandGroup>
                            )}
                            <CommandGroup>
                                {categories?.map((category) => (
                                    <CommandItem
                                        key={category.categoryId}
                                        onSelect={() => {
                                            onChange(category.categoryId)
                                            setSearchValue('')
                                            setOpen(false)
                                        }}>
                                        <Check className={value === category.categoryId ? 'opacity-100' : 'opacity-0'} />
                                        {category.category}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
