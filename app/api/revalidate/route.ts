import { getServerSession } from '@lib/auth/session'
import { CACHE_TAG } from '@lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

const REVALIDATE_EXPIRE_SECONDS = 60 * 60 * 24 * 30

export const POST = async (request: NextRequest) => {
    const session = await getServerSession()

    if (!session?.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await request.json()
        const { tags } = body

        if (!tags || !Array.isArray(tags)) {
            return NextResponse.json({ error: 'tags array is required' }, { status: 400 })
        }

        const validTags: string[] = Object.values(CACHE_TAG)

        const invalidTags = tags.filter((tag) => !validTags.includes(tag))

        if (invalidTags.length > 0) {
            return NextResponse.json({ error: `Invalid tags: ${invalidTags.join(', ')}` }, { status: 400 })
        }

        tags.forEach((tag: string) => {
            revalidateTag(tag, {
                expire: REVALIDATE_EXPIRE_SECONDS,
            })
        })

        return NextResponse.json({ revalidated: true, tags, timestamp: Date.now() })
    } catch (error) {
        return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 })
    }
}
