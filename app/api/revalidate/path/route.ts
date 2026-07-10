import { getServerSession } from '@lib/auth/session'
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_PATH_PREFIXES = ['/article/'] as const

export const POST = async (request: NextRequest) => {
    const session = await getServerSession()

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { path } = body

    if (!path || typeof path !== 'string') {
        return NextResponse.json({ error: 'path is required' }, { status: 400 })
    }

    if (!ALLOWED_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))) {
        return NextResponse.json({ error: 'path is not allowed' }, { status: 400 })
    }

    revalidatePath(path)

    return NextResponse.json({ success: true })
}
