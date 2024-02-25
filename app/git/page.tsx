import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { msgParser, pullingFilesByGit } from './gitpull'
import { Badge } from '@/components/ui/badge'

const GitPull = async ({ searchParams }: { searchParams: { isSuccess?: string; message?: string } }) => {
    return (
        <section className='flex p-3 justify-between gap-3 flex-wrap'>
            <form action={pullingFilesByGit} className='flex-1'>
                <p>Git pull page</p>
                <div className='flex w-full items-center gap-3'>
                    <Label htmlFor='password'>Password</Label>
                    <Input name='password' type='password' id='password' placeholder='password' autoComplete='current-password' />
                    <Button size={'sm'} variant={'default'}>
                        Pull Documents
                    </Button>
                </div>
            </form>
            <section className='flex-1 p-2 bg-foreground/15 rounded relative'>
                <Badge className='bg-opacity-15 bg-neutral-500 text-white absolute top-2 right-2'>Terminal</Badge>
                {searchParams?.isSuccess &&
                    msgParser(searchParams.message as string).map((msg) => {
                        return <p key={msg}>- {msg}</p>
                    })}
            </section>
        </section>
    )
}

export default GitPull
