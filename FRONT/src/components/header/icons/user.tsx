'use client'
import LoginModal from '@/components/modal/loginModal'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LogInIcon } from 'lucide-react'
import { useState } from 'react'

const User = () => {
    const [isLogin] = useState(false)
    return isLogin ? (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className='p-0 m-0 justify-center'>
                <Button variant='ghost' className='p-0 m-0 rounded-full'>
                    <Avatar>
                        <AvatarImage src='/avatars/01.png' alt='@shadcn' />
                        <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-36' forceMount>
                <DropdownMenuItem>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>USERID</p>
                        <p className='text-xs leading-none text-muted-foreground'>EMAIL@GMAIL.COM</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        Settings
                        <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : (
        <LoginModal>
            <Button variant='ghost' size={'icon'}>
                <LogInIcon />
            </Button>
        </LoginModal>
    )
}
export default User
