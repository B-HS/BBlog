'use client'
import { DialogDescription } from '@radix-ui/react-dialog'
import { Button } from '@shared/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@shared/ui/dialog'
import { User2Icon } from 'lucide-react'
import { useState } from 'react'
import { LayoutContent } from './admin-layout-component'
import { LayoutRoutingComponent } from './admin-layout-routing-component'

export const AdminWidget = () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant={'ghost'} size={'icon'} asChild aria-label='Icon'>
                    <span className='p-2'>
                        <User2Icon className='size-5' />
                    </span>
                </Button>
            </DialogTrigger>
            <DialogContent
                className='w-[95dvw] max-w-full h-[95dvh] !min-h-auto overflow-hidden p-10'
                onEscapeKeyDown={(e) => e.preventDefault()}
                onPointerDownOutside={(e) => e.preventDefault()}>
                <DialogTitle hidden />
                <DialogDescription hidden />
                <LayoutContent>
                    <LayoutRoutingComponent />
                </LayoutContent>
            </DialogContent>
        </Dialog>
    )
}
