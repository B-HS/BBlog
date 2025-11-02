import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const { tags } = body

        if (!tags || !Array.isArray(tags)) {
            return NextResponse.json({ error: 'tags array is required' }, { status: 400 })
        }

        tags.forEach((tag: string) => {
            revalidateTag(tag, 'max')
        })

        return NextResponse.json({ revalidated: true, tags, timestamp: Date.now() })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
    }
}
