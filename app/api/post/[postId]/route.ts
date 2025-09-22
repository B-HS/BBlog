import { NextRequest, NextResponse } from 'next/server'
import { getPostById } from '@/entities/post/post.services'

export const GET = async (
    _request: NextRequest,
    { params }: { params: Promise<{ postId: string }> }
) => {
    try {
        const { postId } = await params

        if (!postId) {
            return NextResponse.json(
                { error: 'Post ID is required' },
                { status: 400 }
            )
        }

        const response = await getPostById(postId)

        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        console.error('Error fetching post:', error)
        return NextResponse.json(
            { error: 'Failed to fetch post' },
            { status: 500 }
        )
    }
}