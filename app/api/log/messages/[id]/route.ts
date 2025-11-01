import { deleteMessage } from '@entities/message'
import { auth } from '@lib/auth/auth'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
        const { id } = await params
        await deleteMessage(id)

        revalidateTag('logMessages', 'max')

        return NextResponse.json({ success: true, id })
    } catch (error) {
        console.error('Message deletion error:', error)
        return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 })
    }
}
