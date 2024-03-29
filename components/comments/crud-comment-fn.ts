import { createClient } from '@/utils/supabase/server'
import { cookies, headers } from 'next/headers'
import { CommentProps } from './comments'
import { redirect } from 'next/navigation'

export const addComment = async (formData: FormData) => {
    'use server'
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')
    const currentURL = `${origin}://${domain}`
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { user } = (await supabase.auth.getUser()).data
    const context = formData.get('context') as string
    const post = formData.get('post') as string
    const upper_id = formData.get('id') as string
    const avatarUrl = user?.user_metadata?.avatar_url || currentURL + '/image/hs-padding.png'
    const username = user?.user_metadata?.name || user?.email || undefined
    const refectoredData = { context, post, user_id: user!.id, upper_id: 0, avatar: avatarUrl, username }
    if (!!upper_id) {
        refectoredData.upper_id = parseInt(upper_id)
    }
    const { data, error } = await supabase.from('comments').insert(refectoredData).select()
    if (error) {
        console.log(error)
    }

    const targetId = (data![0].id || undefined) as CommentProps | undefined
    return redirect(currentURL + `/article/${post}?comment=${targetId}#${targetId}`)
}
