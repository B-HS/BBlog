import { NextResponse, type NextRequest } from 'next/server'

const AuthPaths = ['/write', '/api/image/upload', '/api/admin']
const ArticleRegex = /^\/article\/\d+$/

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl

    const isAuthPath = AuthPaths.some((authPath) => pathname.startsWith(authPath))
    const isTargetArticlePath = ArticleRegex.test(pathname)

    if (isAuthPath) {
        const { auth } = await import('@shared/auth')
        const session = await auth()
        if (!session?.user) {
            return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 })
        }
    }

    if (isTargetArticlePath) {
        try {
            const ip = (request.headers.get('x-forwarded-for') ?? 'Unknown').split(',')[0]
            const visitorInfo = { ip, path: pathname }

            fetch(`${process.env.SITE_URL}/api/visitor`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(visitorInfo),
            })
        } catch (e) {}
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)'],
}
