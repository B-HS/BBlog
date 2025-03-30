import { db } from 'drizzle'
import { eq } from 'drizzle-orm'
import { posts } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'

type RequestProps = {
    isNotice: boolean
    isComment: boolean
    isHide: boolean
    postId: number
}

export const PUT = async (req: NextRequest) => {
    const body = (await req.json()) as RequestProps
    const { postId, isNotice, isComment, isHide } = body

    if (!postId) {
        return NextResponse.json({ message: 'Invalid postId' }, { status: 400 })
    }

    if (typeof isNotice !== 'boolean' || typeof isComment !== 'boolean' || typeof isHide !== 'boolean') {
        return NextResponse.json({ message: 'Invalid params' }, { status: 400 })
    }

    try {
        await db
            .update(posts)
            .set({
                isNotice,
                isComment,
                isHide,
            })
            .where(eq(posts.postId, postId))
            .execute()

        return NextResponse.json({ message: 'Update successful' }, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ message: 'An error occurred' }, { status: 500 })
    }
}
export const DELETE = async (req: NextRequest) => {}
