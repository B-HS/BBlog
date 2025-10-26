'use client'

import { useCreateTag, useGetTagList } from '@entities/tag.client'
import { Badge } from '@ui/badge'
import { Button } from '@ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@ui/popover'
import { Check, ChevronsUpDown, Plus } from 'lucide-react'
import { FC, useState } from 'react'

type TagSelectProps = {
    selectedTagIds: number[]
    onChange: (tagIds: number[]) => void
}

export const TagSelect: FC<TagSelectProps> = ({ selectedTagIds, onChange }) => {
    const { data: tags } = useGetTagList()
    const createTag = useCreateTag()
    const [open, setOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const toggleTag = (tagId: number) => {
        if (selectedTagIds.includes(tagId)) {
            onChange(selectedTagIds.filter((id) => id !== tagId))
        } else {
            onChange([...selectedTagIds, tagId])
        }
    }

    const selectedTags = tags?.filter((tag) => selectedTagIds.includes(tag.tagId)) || []

    const hasExactMatch = tags?.some((tag) => tag.tag.toLowerCase() === searchValue.toLowerCase())
    const showCreateButton = searchValue.trim() && !hasExactMatch

    const handleCreate = async () => {
        createTag.mutate(searchValue, {
            onSuccess: (newTag) => {
                onChange([...selectedTagIds, newTag.tagId])
                setSearchValue('')
            },
        })
    }

    return (
        <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>태그</label>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant='outline' role='combobox' aria-expanded={open} className='w-full justify-between h-auto min-h-9'>
                        <div className='flex flex-wrap gap-1'>
                            {selectedTags.length > 0 ? (
                                selectedTags.map((tag) => (
                                    <Badge key={tag.tagId} variant='secondary' className='gap-1 rounded-xs'>
                                        {tag.tag}
                                    </Badge>
                                ))
                            ) : (
                                <span className='text-muted-foreground'>태그를 선택하세요</span>
                            )}
                        </div>
                        <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className='w-full p-0' align='start'>
                    <Command>
                        <CommandInput placeholder='태그 검색...' value={searchValue} onValueChange={setSearchValue} />
                        <CommandList>
                            <CommandEmpty>태그를 찾을 수 없습니다.</CommandEmpty>
                            {showCreateButton && (
                                <CommandGroup>
                                    <CommandItem onSelect={handleCreate} disabled={createTag.isPending}>
                                        <Plus className='mr-2 h-4 w-4' />
                                        &quot;{searchValue}&quot; 추가
                                    </CommandItem>
                                </CommandGroup>
                            )}
                            <CommandGroup>
                                {tags?.map((tag) => (
                                    <CommandItem key={tag.tagId} onSelect={() => toggleTag(tag.tagId)}>
                                        <Check className={selectedTagIds.includes(tag.tagId) ? 'opacity-100' : 'opacity-0'} />
                                        {tag.tag}
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
