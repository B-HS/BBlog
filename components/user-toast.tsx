'use client'
import { User } from '@supabase/supabase-js'
import { useEffect } from 'react'
import { useToast } from './ui/use-toast'

const GlobalToast = ({ user }: { user: User | null }) => {
    const { toast } = useToast()
    useEffect(() => {
        if (user) {
            toast({ title: 'Log in', description: `Logged in as ${user.email}` })
        } else {
            toast({ title: 'Log out', description: 'Logged out' })
        }
    }, [user, toast])

    return <></>
}

export default GlobalToast
