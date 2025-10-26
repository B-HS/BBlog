import { getCommentList, insertComment, updateComment, deleteComment } from '@entities/comment'
import { auth } from '@lib/auth/auth'

import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    if (!postId) {
        return NextResponse.json({ error: 'Missing postId' }, { status: 400 })
    }

    try {
        const comments = await getCommentList(Number(postId))
        return NextResponse.json(comments)
    } catch (error) {
        console.error('Comment fetch error:', error)
        return NextResponse.json({ error: 'Failed to fetch comments' }, { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { postId, comment, isHide } = body

    if (!postId || !comment) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
        const newComment = await insertComment({
            postId: Number(postId),
            userId: session.user.id,
            comment,
            isHide: isHide ?? false,
        })

        return NextResponse.json(newComment)
    } catch (error) {
        console.error('Comment creation error:', error)
        return NextResponse.json({ error: 'Failed to create comment' }, { status: 500 })
    }
}

export const PATCH = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { commentId, comment, isHide } = body

    if (!commentId || !comment) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
        await updateComment(Number(commentId), session.user.id, comment, isHide)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Comment update error:', error)
        return NextResponse.json({ error: 'Failed to update comment' }, { status: 500 })
    }
}

export const DELETE = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { commentId } = body

    if (!commentId) {
        return NextResponse.json({ error: 'Missing commentId' }, { status: 400 })
    }

    try {
        await deleteComment(Number(commentId), session.user.id)

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Comment deletion error:', error)
        return NextResponse.json({ error: 'Failed to delete comment' }, { status: 500 })
    }
}
