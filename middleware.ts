import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'
import { headers } from 'next/headers'

const middleware = async (request: NextRequest) => {
    const headersList = headers()
    const ip = (headersList.get('x-forwarded-for') ?? 'UNKNOWN').split(',')[0]
    const { pathname } = request.nextUrl

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

    const authPaths = ['/editor', '/git', '/api/image/upload']
    const isAuthPath = authPaths.some((authPath) => pathname.includes(authPath))
    const isAdmin = session.data.session?.user.email === process.env.ADMIN_EMAIL

    if (isAuthPath && !isAdmin) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return res
}

export const config = {
    matcher: ['/((?!_next/static|_next/post|image|favicon.ico).*)'],
}

export default middleware
