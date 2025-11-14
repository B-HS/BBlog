import { deletePost, updatePostHide } from '@entities/admin'
import { auth } from '@lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    try {
        const result = await deletePost(Number(id))
        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to delete post:', error)
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
    }
}

export const PATCH = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params
    const body = await request.json()
    const { isHide } = body

    if (typeof isHide !== 'boolean') {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
        const result = await updatePostHide(Number(id), isHide)
        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to update post:', error)
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }
}
