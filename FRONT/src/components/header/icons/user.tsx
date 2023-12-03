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
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { UserContext, UserLogout } from '@/module/context/user'
import { LogInIcon } from 'lucide-react'
import { useContext } from 'react'

const User = () => {
    const { userdata } = useContext(UserContext)
    const { atk, rtk, nickname, email, introduce, lastLogin, roles, urkey, urname, img } = userdata
    console.log('Rest infos', introduce, lastLogin, roles, urkey, urname)

    return atk && rtk && nickname ? (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className='p-0 m-0 justify-center'>
                <Button variant='ghost' className='p-0 m-0 rounded-full bg-white'>
                    <Avatar>
                        <AvatarImage src={img ? img : '/favicon.ico'} alt='usericon' />
                        <AvatarFallback>{nickname.split(' ').length === 1 ? nickname.slice(0, 2) : nickname}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-72' forceMount>
                <DropdownMenuItem>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>{nickname}</p>
                        <p className='text-xs leading-none text-muted-foreground'>{email}</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={UserLogout}>Log out</DropdownMenuItem>
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
