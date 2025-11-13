import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    const body = await request.json()
    const { path } = body

    if (!path || typeof path !== 'string') {
        return NextResponse.json({ error: 'path is required' }, { status: 400 })
    }

    revalidatePath(path)

    return NextResponse.json({ success: true })
}
