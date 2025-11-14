import { getAllComments } from '@entities/admin'
import { auth } from '@lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
        const comments = await getAllComments()
        return NextResponse.json(comments)
    } catch (error) {
        console.error('Failed to fetch comments:', error)
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
    }
}
