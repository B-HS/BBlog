import crypto from 'crypto'
import { db } from 'drizzle'
import { eq } from 'drizzle-orm'
import { comments } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'

const iv = process.env.PASSWORD_IV || 'abcdefghijklmnop'
const secretKey = process.env.PASSWORD_SALT || '1234567890abcdefghijklmnopqrstuv'

const encryptPassword = (password: string) => {
    if (secretKey.length !== 32 || iv.length !== 16) {
        throw new Error('Secret key must be 32 bytes and IV must be 16 bytes for AES-256 encryption.')
    }

    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(iv))
    let encrypted = cipher.update(password, 'utf8', 'hex')
    encrypted += cipher.final('hex')

    return encrypted
}

const isPasswordMatched = (password: string, encryptedPassword: string) => {
    if (secretKey.length !== 32 || iv.length !== 16) {
        throw new Error('Secret key must be 32 bytes and IV must be 16 bytes for AES-256 encryption.')
    }

    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(iv))
    let decrypted = decipher.update(encryptedPassword, 'hex', 'utf8')
    decrypted += decipher.final('utf8')

    return decrypted === password
}

const handleError = (error: unknown, status: number = 500) => {
    console.error(error)
    return NextResponse.json({ message: 'An error occurred' }, { status })
}

const validateBody = (body: Record<string, any>) => {
    const missingFields = Object.entries(body).filter(([_, value]) => !value)
    if (missingFields.length > 0) {
        return missingFields.map(([key]) => `${key} is required`)
    }
    return []
}

const GET = async (req: NextRequest, { params }: { params: Promise<{ postId: string }> }) => {
    try {
        const { postId: rawPostId } = await params
        const page = Number(req.nextUrl.searchParams.get('page') || '1')
        const limit = 100
        const postId = Number(rawPostId)

        if (!postId) return NextResponse.json({ message: 'Invalid post ID' }, { status: 404 })

        const commentList = await db
            .select()
            .from(comments)
            .where(eq(comments.postId, postId))
            .limit(limit)
            .offset((page - 1) * limit)

        return NextResponse.json({ comments: commentList })
    } catch (error) {
        return handleError(error)
    }
}

const POST = async (req: NextRequest, { params }: { params: Promise<{ postId: string }> }) => {
    try {
        const { postId: rawPostId } = await params
        const postId = Number(rawPostId)
        const body = (await req.json()) as { username: string; password: string; commentText: string }

        const validationErrors = validateBody(body)
        if (validationErrors.length > 0) {
            return NextResponse.json({ message: validationErrors.join(', ') }, { status: 400 })
        }

        const encryptedPassword = encryptPassword(body.password)

        const [commentId] = await db
            .insert(comments)
            .values({
                postId,
                nickname: body.username,
                password: encryptedPassword,
                comment: body.commentText,
            })
            .$returningId()
            .execute()

        return NextResponse.json({ message: 'Comment added successfully', commentId: commentId.commentId }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

const DELETE = async (req: NextRequest) => {
    try {
        const body = (await req.json()) as { id: number; password: string }

        const comment = await db.select().from(comments).where(eq(comments.commentId, body.id)).limit(1)
        if (comment.length === 0) return NextResponse.json({ message: 'Comment not found' }, { status: 404 })

        const storedPassword = comment[0]?.password
        if (!isPasswordMatched(body.password, storedPassword)) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 403 })
        }

        await db.delete(comments).where(eq(comments.commentId, body.id))

        return NextResponse.json({ message: 'Comment deleted successfully' }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

const PUT = async (req: NextRequest) => {
    try {
        const body = (await req.json()) as { id: number; password: string; commentText: string }
        const comment = await db.select().from(comments).where(eq(comments.commentId, body.id)).limit(1)
        if (comment.length === 0) return NextResponse.json({ message: 'Comment not found' }, { status: 404 })

        const storedPassword = comment[0]?.password
        if (!isPasswordMatched(body.password, storedPassword)) {
            return NextResponse.json({ message: 'Invalid password' }, { status: 403 })
        }

        await db.update(comments).set({ comment: body.commentText }).where(eq(comments.commentId, body.id))

        return NextResponse.json({ message: 'Comment updated successfully' }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const commentApi = { DELETE, GET, POST, PUT }
