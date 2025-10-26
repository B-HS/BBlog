import { QUERY_KEY } from '@lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const { tags } = body

        if (!tags || !Array.isArray(tags)) {
            return NextResponse.json({ error: 'tags array is required' }, { status: 400 })
        }

        const validTags = Object.values(QUERY_KEY).flatMap((value) => {
            if (typeof value === 'string') return [value]
            if (typeof value === 'object') return Object.values(value).filter((v) => typeof v === 'string')
            return []
        })

        const invalidTags = tags.filter((tag) => !validTags.includes(tag))

        if (invalidTags.length > 0) {
            return NextResponse.json({ error: `Invalid tags: ${invalidTags.join(', ')}` }, { status: 400 })
        }

        tags.forEach((tag: string) => {
            revalidateTag(tag, {
                expire: 60 * 60 * 24 * 30, // 30 days
            })
        })

        return NextResponse.json({ revalidated: true, tags, timestamp: Date.now() })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
    }
}
