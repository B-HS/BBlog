import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    if (code) {
        const cookieStore = cookies()
        const supabase = createClient(cookieStore)
        await supabase.auth.exchangeCodeForSession(code)
    }
    return NextResponse.redirect(requestUrl.origin)
}
