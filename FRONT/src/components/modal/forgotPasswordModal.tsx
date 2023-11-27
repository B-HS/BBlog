import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Flex from '../flex'
const ForgotPassword = ({ children }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Sign In</DialogTitle>
                </DialogHeader>
                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <Label htmlFor='name' className='text-right'>
                            Email
                        </Label>
                        <Input id='name' className='col-span-3' />
                    </div>
                </div>
                <DialogFooter>
                    <Flex className='p-0 justify-end gap-2 w-full'>
                        <Button type='submit'>Requesting a temporary password</Button>
                    </Flex>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default ForgotPassword
