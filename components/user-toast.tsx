'use client'
import { User } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useToast } from './ui/use-toast'
import { Badge } from './ui/badge'

const GlobalToast = ({ user }: { user: User | null }) => {
    const { toast } = useToast()
    useEffect(() => {
        if (user) {
            toast({
                title: 'Log in',
                description: (
                    <section>
                        <span>Hello </span>
                        <Badge className='rounded-none p-0.5 px-1.15 bg-foreground/10 text-foreground'>
                            {user?.user_metadata?.name || user?.email} !
                        </Badge>
                    </section>
                ),
            })
        } else {
            toast({ title: 'Log out', description: 'Logged out' })
        }
    }, [user, toast])

    return null
}

export default GlobalToast
