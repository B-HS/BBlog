import { auth } from '@shared/auth'
import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

const middleware = async (request: NextRequest) => {
    const VisitorCheckingUrlList = ['/article', '/login', '/tag', '/']
    const authPaths = ['/write', '/api/image/upload', '/api/admin']
    const session = await auth()
    const headersList = await headers()
    const ip = (headersList.get('x-forwarded-for') ?? 'Unknown').split(',')[0]
    const { pathname } = request.nextUrl
    const visitorInfo = {
        ip,
        path: pathname,
    }
    const isAuthPath = authPaths.some((authPath) => pathname.includes(authPath))
    const isAdmin = session?.user

    if (isAuthPath && !isAdmin) {
        return NextResponse.json({ message: 'Unauthenticated' }, { status: 401 })
    }

    if (!VisitorCheckingUrlList.some((url) => pathname.includes(url) && !pathname.includes('/api'))) {
        return NextResponse.next()
    }

    try {
        await fetch(`${process.env.SITE_URL}/api/visitor`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(visitorInfo),
        })
        console.log('Visitor info saved successfully:', visitorInfo)
    } catch (error) {
        console.error('Error occurred while saving visitor info:', error)
    }
}

export const config = {
    matcher: ['/((?!_next/static|favicon.ico).*)'],
}

export default middleware
