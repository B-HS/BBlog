'use client'

import { Row } from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

import { Edit3Icon } from 'lucide-react'

interface DataTableRowActionsProps<TData> {
    row: Row<TData>
    edit?: Function
    remove?: Function
}

export function DataTableRowActions<TData>({ row, edit, remove }: DataTableRowActionsProps<TData>) {
    const removeRow = () => remove && remove(row.original)
    const editRow = () => edit && edit(row.original)
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'>
                    <Edit3Icon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[160px]'>
                {edit && <DropdownMenuItem onClick={editRow}>Edit</DropdownMenuItem>}
                {remove && <DropdownMenuItem onClick={removeRow}>Delete</DropdownMenuItem>}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
