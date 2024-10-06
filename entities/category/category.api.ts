import { auth } from '@shared/auth'
import { db } from 'drizzle'
import { eq } from 'drizzle-orm'
import { categories } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'

const handleError = (error: unknown, status: number = 500) => {
    console.error(error)
    return NextResponse.json({ message: 'An error occurred' }, { status })
}

export const GET = async () => {
    const session = await auth()

    try {
        const result = await db
            .select()
            .from(categories)
            .where(!session?.user ? eq(categories.isHide, false) : undefined)
            .execute()
        return NextResponse.json({ categories: result }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const POST = async (req: NextRequest) => {
    try {
        const body = (await req.json()) as { name: string }

        if (!body.name) {
            return NextResponse.json({ message: 'Category name is required' }, { status: 400 })
        }

        await db.insert(categories).values({ category: body.name }).execute()

        return NextResponse.json({ message: 'Category added successfully' }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const DELETE = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const categoryId = Number(params.id)
        if (!categoryId) {
            return NextResponse.json({ message: 'Invalid category ID' }, { status: 400 })
        }

        await db.update(categories).set({ isHide: true }).where(eq(categories.categoryId, categoryId))

        return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const CategoryApi = {
    GET,
    POST,
    DELETE,
}
