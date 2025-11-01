import { insertMessage } from '@entities/message'
import { auth } from '@lib/auth/auth'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { body: messageBody, imageIds, replyToId, retweetOfId } = body

    if (!messageBody) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
        const message = await insertMessage({
            userId: session.user.id,
            body: messageBody,
            imageIds: imageIds || [],
            replyToId,
            retweetOfId,
        })

        revalidateTag('logMessages')

        return NextResponse.json(message)
    } catch (error) {
        console.error('Message creation error:', error)
        return NextResponse.json({ error: 'Failed to create message' }, { status: 500 })
    }
}
