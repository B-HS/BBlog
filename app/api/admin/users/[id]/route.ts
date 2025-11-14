import { deleteUser } from '@entities/admin'
import { auth } from '@lib/auth/auth'
import { NextRequest, NextResponse } from 'next/server'

export const DELETE = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user || session.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { id } = await params

    try {
        const result = await deleteUser(id)
        return NextResponse.json(result)
    } catch (error) {
        console.error('Failed to delete user:', error)
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 })
    }
}
