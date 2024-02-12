import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'
import { headers } from 'next/headers'

const middleware = async (request: NextRequest) => {
    const headersList = headers()
    const domain = headersList.get('x-forwarded-host')
    const origin = headersList.get('x-forwarded-proto')
    const currentURL = `${origin}://${domain}`
    const ip = (headersList.get('x-forwarded-for') ?? 'UNKNOWN').split(',')[0]

    const { pathname } = request.nextUrl
    console.log(pathname)

    let session
    let res
    try {
        const { supabase, response } = createClient(request)
        res = response
        await supabase.from('visitors').insert({ ip, url: pathname })
        session = await supabase.auth.getSession()
    } catch (e) {
        return NextResponse.next({
            request: {
                headers: request.headers,
            },
        })
    }

    if (pathname.includes('admin')) {
        if (!session.data.session) {
            return NextResponse.redirect(currentURL + '/login')
        }
    }

    return res
}

export const config = {
    matcher: ['/((?!_next/static|_next/post|image|favicon.ico).*)'],
}

export default middleware
