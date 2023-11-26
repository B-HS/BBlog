import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GithubIcon, UserPlus2Icon } from 'lucide-react'
import Flex from '../flex'
import { Separator } from '../ui/separator'
const LoginModal = ({ children }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Email
                        </Label>
                        <Input id='name' className='col-span-3' />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='username' className='text-right'>
                            Password
                        </Label>
                        <Input id='username' className='col-span-3' />
                    </div>
                </div>
                <DialogFooter>
                    <Flex className='p-0 justify-between gap-2 w-full'>
                        <Button variant={'ghost'}>Forgot password</Button>
                        <Button type='submit'>Login</Button>
                    </Flex>
                </DialogFooter>
                <Separator />
                <Flex className='flex-col gap-2'>
                    <Button>
                        <GithubIcon className='mr-1' />
                        Log in with Github
                    </Button>
                    <Button size='default' variant={'outline'}>
                        <UserPlus2Icon className='mr-1' />
                        Sign in
                    </Button>
                </Flex>
            </DialogContent>
        </Dialog>
    )
}
export default LoginModal
