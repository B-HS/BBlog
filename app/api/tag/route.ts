import { createTag, getTagList } from '@entities/tag'
import { QUERY_KEY } from '@lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const tags = await getTagList()
        return NextResponse.json(tags)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch tags' }, { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const { tag } = body

        if (!tag || typeof tag !== 'string') {
            return NextResponse.json({ error: 'Tag name is required' }, { status: 400 })
        }

        const newTag = await createTag(tag)

        revalidateTag(QUERY_KEY.TAG.LIST, 'max')

        return NextResponse.json(newTag)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create tag' }, { status: 500 })
    }
}
