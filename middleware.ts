import { auth } from '@shared/auth'
import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

const middleware = async (request: NextRequest, response: NextResponse) => {
    const session = await auth()
    const headersList = headers()
    const ip = (headersList.get('x-forwarded-for') ?? 'UNKNOWN').split(',')[0]
    const { pathname } = request.nextUrl

    const authPaths = ['/write', '/api/image/upload']
    const isAuthPath = authPaths.some((authPath) => pathname.includes(authPath))
    const isAdmin = session?.user

    if (isAuthPath && !isAdmin) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)'],
}

export default middleware
