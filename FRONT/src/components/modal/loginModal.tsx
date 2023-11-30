import { userLogin } from '@/api/user/login'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useToast } from '@/components/ui/use-toast'
import useForm from '@/hooks/useForm'
import { setCookie } from 'cookies-next'
import { GithubIcon, UserPlus2Icon } from 'lucide-react'
import { useState } from 'react'
import Flex from '../flex'
import ForgotPassword from './forgotPasswordModal'
import SignIn from './joinModal'
interface LoginData {
    email: string
    pw: string
}
interface LoginRes {
    atk: string
    rtk: string
    menu: object[]
    userInfo: object
    [key: string]: string | object | object[]
}
const LoginModal = ({ children }: React.HTMLAttributes<HTMLElement>) => {
    const { toast } = useToast()
    const [visible, setVisible] = useState<boolean>(false)
    const { formData, onChangeFormData, setFormData } = useForm<LoginData>({
        email: '',
        pw: '',
    })
    const resetModal = () => {
        setFormData({ email: '', pw: '' })
        setVisible(false)
    }

    const login = async () => {
        const data: LoginRes = await userLogin(formData.email, formData.pw)
        if (data.atk) {
            window.location.reload()
            Object.keys(data).forEach((info) => setCookie(info, data[info]))
            resetModal()
        } else {
            toast({
                title: 'Login Failed',
                description: 'Please check your email and password',
                variant: 'destructive',
            })
        }
    }

    return (
        <Dialog open={visible} onOpenChange={setVisible}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px] gap-1.5'>
                <DialogHeader>
                    <DialogTitle>Login</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form className='grid gap-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Email
                        </Label>
                        <Input name='email' className='col-span-3' value={formData.email} onChange={onChangeFormData} />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='pw' className='text-right'>
                            Password
                        </Label>
                        <Input type='password' name='pw' className='col-span-3' autoComplete='off' value={formData.pw} onChange={onChangeFormData} />
                    </div>
                </form>
                <DialogFooter>
                    <Flex className='p-0 justify-end gap-2 w-full'>
                        <ForgotPassword>
                            <Button variant={'ghost'}>Forgot password</Button>
                        </ForgotPassword>
                    </Flex>
                </DialogFooter>
                <Separator />
                <Flex className='flex-col gap-2 mt-3'>
                    <Button type='submit' onClick={login}>
                        Login
                    </Button>
                    <Button className='bg-neutral-500'>
                        <GithubIcon className='mr-1' />
                        Log in with Github
                    </Button>
                    <SignIn>
                        <Button size='default' variant={'outline'}>
                            <UserPlus2Icon className='mr-1' />
                            Sign in
                        </Button>
                    </SignIn>
                </Flex>
            </DialogContent>
        </Dialog>
    )
}
export default LoginModal
