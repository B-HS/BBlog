import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const signIn = async (formData: FormData) => {
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

export const githubSignIn = async () => {
    'use server'
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://localhost:3000/auth/callback',
        },
    })
    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }
    return redirect(data.url)
}
