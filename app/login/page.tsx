'use client'
import { Button } from '@shared/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@shared/ui/card'
import { Input } from '@shared/ui/input'
import { Label } from '@shared/ui/label'
import { useToast } from '@shared/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { ChangeEventHandler, useState } from 'react'

const LoginPage = () => {
    const router = useRouter()
    const { toast } = useToast()
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    })

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const login = () =>
        signIn('credentials', {
            email: loginData.email,
            password: loginData.password,
            redirect: false,
        }).then((res) => {
            if (res?.error) {
                toast({
                    title: 'Error',
                    description: 'Invalid email or password',
                })
                return
            }
            toast({
                title: 'Success',
                description: 'You have successfully logged in',
            })
            router.push('/')
        })

    return (
        <div className='flex flex-col items-center justify-center my-auto'>
            <Card className='w-full max-w-sm border-none shadow-none'>
                <CardHeader>
                    <CardTitle className='text-2xl'>Login</CardTitle>
                </CardHeader>
                <CardContent className='grid gap-4'>
                    <div className='grid gap-2'>
                        <Label htmlFor='email'>Email</Label>
                        <Input onChange={onChange} name='email' id='email' type='email' placeholder='m@example.com' required />
                    </div>
                    <div className='grid gap-2'>
                        <Label htmlFor='password'>Password</Label>
                        <Input onChange={onChange} name='password' id='password' type='password' autoComplete='current-password' required />
                    </div>
                </CardContent>

                <CardFooter className='flex flex-col items-start gap-2'>
                    <Button onClick={login} className='w-full'>
                        Sign in
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default LoginPage
