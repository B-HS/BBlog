import { getMessagesByUserId } from '@entities/message'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: { params: Promise<{ userId: string }> }) => {
    const { userId } = await params
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1', 10)
    const size = parseInt(searchParams.get('size') || '10', 10)

    try {
        const data = await getMessagesByUserId({ userId, page, size })
        return NextResponse.json(data)
    } catch (error) {
        console.error('Failed to fetch messages:', error)
        return NextResponse.json({ error: 'Failed to fetch messages' }, { status: 500 })
    }
}
