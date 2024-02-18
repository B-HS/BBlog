import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { BirdIcon } from 'lucide-react'
import { githubSignIn, signIn } from './singin-fn'

const Login = async ({ searchParams }: { searchParams: { message: string } }) => {
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
            </form>
            <form className='animate-in flex flex-col w-full justify-center gap-5 text-foreground max-w-xs' action={githubSignIn}>
                <Button variant={'secondary'} className='flex gap-1 items-center'>
                    <GitHubLogoIcon width={22} height={22} />
                    <span>Sign in with Github</span>
                </Button>
            </form>
            {searchParams?.message && <p className='mt-7 px-3.5 py-1.5 bg-foreground/10 text-foreground text-center'>{searchParams.message}</p>}
        </section>
    )
}
export default Login
