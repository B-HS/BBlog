'use client'

import { PopoverClose } from '@radix-ui/react-popover'

const PopClose = ({ children }: { children: React.ReactNode }) => {
    return <PopoverClose asChild>{children}</PopoverClose>
}

export default PopClose
