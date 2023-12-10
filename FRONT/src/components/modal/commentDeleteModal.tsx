'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import Flex from '../flex'
const DeleteComment = ({ children, removeFn }: { children: React.ReactNode; removeFn: Function }) => {
    const [pw, setPw] = useState('')
    const [open, setOpen] = useState(false)
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Delete Comment</DialogTitle>
                </DialogHeader>
                <p>{`Are you sure you want to delete this comment?`}</p>
                <p>{`This will remove the comment and can't be undone.`}</p>
                <Input type='text' placeholder='Enter your password' onChange={(e) => setPw(e.target.value)} value={pw} />
                <DialogFooter>
                    <Flex className='p-0 justify-end gap-2 w-full'>
                        <Button variant={'destructive'} onClick={() => removeFn(pw, () => setOpen(false))}>
                            Remove
                        </Button>
                        <Button variant={'outline'}>Cancel</Button>
                    </Flex>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
export default DeleteComment
