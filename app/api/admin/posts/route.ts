import { getAllPosts } from '@entities/admin'
import { auth } from '@lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
        const posts = await getAllPosts()
        return NextResponse.json(posts)
    } catch (error) {
        console.error('Failed to fetch posts:', error)
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}
