import { getPost, updatePost } from '@entities/post'
import { auth } from '@lib/auth/auth'
import { QUERY_KEY } from '@lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    try {
        const { id } = await params
        const [post] = await getPost(id)

        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 })
        }

        return NextResponse.json(post)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
    }
}

export const PUT = async (request: NextRequest, { params }: { params: Promise<{ id: string }> }) => {
    const session = await auth.api.getSession({ headers: request.headers })
    if (session?.user.role !== 'admin') {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    try {
        const { id } = await params
        const body = await request.json()
        const { title, description, categoryId, tagIds, isPublished } = body

        if (!title || !description || !categoryId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        await updatePost(Number(id), {
            title,
            description,
            categoryId,
            tagIds: tagIds || [],
            isPublished,
        })

        revalidateTag(QUERY_KEY.POST.GET(id).join('-'), 'max')
        revalidateTag('postList', 'max')

        return NextResponse.json({ success: true, postId: Number(id) })
    } catch (error) {
        console.error('Post update error:', error)
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
    }
}
