import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createClient } from '@/utils/supabase/server'
import { BirdIcon } from 'lucide-react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const Login = ({ searchParams }: { searchParams: { message: string } }) => {
    const signIn = async (formData: FormData) => {
        'use server'
        const email = formData.get('email') as string
        const password = formData.get('password') as string
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })
        if (error) {
            return redirect('/login?message=Could not authenticate user')
        }
        return redirect('/')
    }

    return (
        <section className='w-full flex-1 flex flex-col justify-center items-center gap-3 py-5'>
            <BirdIcon className='animate-bounce' />
            <form className='animate-in flex flex-col w-full justify-center gap-5 text-foreground max-w-xs' action={signIn}>
                <div className='grid w-full items-center gap-1.5'>
                    <Label htmlFor='email'>Email</Label>
                    <Input type='email' id='email' placeholder='Email' name='email' />
                </div>
                <div className='grid w-full items-center gap-1.5'>
                    <Label htmlFor='password'>Password</Label>
                    <Input name='password' type='password' id='password' placeholder='password' autoComplete='current-password' />
                </div>
                <Button variant={'default'}>Sign In</Button>
                {searchParams?.message && <p className='mt-4 p-4 bg-foreground/10 text-foreground text-center'>{searchParams.message}</p>}
            </form>
        </section>
    )
}
export default Login
