import { insertPost } from '@entities/post'
import { auth } from '@lib/auth/auth'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, description, categoryId, tagIds, isPublished } = body

    if (!title || !description || !categoryId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    try {
        const post = await insertPost({
            title,
            description,
            categoryId,
            tagIds: tagIds || [],
            isPublished,
        })

        revalidateTag('postList', 'max')

        return NextResponse.json(post)
    } catch (error) {
        console.error('Post creation error:', error)
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
    }
}
