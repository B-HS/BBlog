'use client'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'
import { buttonVariants } from '../../ui/button'
const Search = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    return (
        <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger className={buttonVariants({ variant: 'ghost', size: 'icon' })}>
                <SearchIcon />
            </PopoverTrigger>
            <PopoverContent className='p-0 sm:w-[639px] transition-all'>
                <Command>
                    <CommandInput placeholder='Keyword...' />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading='Suggestions'>
                            <CommandItem
                                className='cursor-pointer'
                                onSelect={(e) => {
                                    console.log(e as string)
                                    setIsOpen(false)
                                }}
                            >
                                <span>11</span>
                            </CommandItem>
                            <CommandItem
                                className='cursor-pointer'
                                onSelect={(e) => {
                                    console.log(e as string)
                                    setIsOpen(false)
                                }}
                            >
                                <span>22</span>
                            </CommandItem>
                            <CommandItem
                                className='cursor-pointer'
                                onSelect={(e) => {
                                    console.log(e as string)
                                    setIsOpen(false)
                                }}
                            >
                                <span>3</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default Search
