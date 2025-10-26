import { getImageList } from '@entities/image'
import { auth } from '@lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
        const images = await getImageList()
        return NextResponse.json(images)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 })
    }
}
