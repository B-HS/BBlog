import { deleteComment, updateCommentHide } from '@entities/admin'
import { auth } from '@lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    try {
        const result = await deleteComment(Number(id))
        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to delete comment:', error)
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
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
        const result = await updateCommentHide(Number(id), isHide)
        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to update comment:', error)
        return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 })
    }
}
