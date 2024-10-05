'use client'

import { PopoverClose } from '@radix-ui/react-popover'
import { ReactNode } from 'react'

export const PopClose = ({ children }: { children: ReactNode }) => {
    return <PopoverClose asChild>{children}</PopoverClose>
}
