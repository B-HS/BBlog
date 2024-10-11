import { auth } from '@shared/auth'
import { db } from 'drizzle'
import { eq } from 'drizzle-orm'
import { categories } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'

const handleError = (error: unknown, status: number = 500) => {
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

        const [result] = await db.insert(categories).values({ category: body.name }).$returningId().execute()

        console.log(result)

        return NextResponse.json({ message: 'Category added successfully', categoryId: result.categoryId }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const PUT = async (req: NextRequest) => {
    try {
        const body = (await req.json()) as { name: string; categoryId: number; active?: boolean }

        if (!body.categoryId) {
            return NextResponse.json({ message: 'Invalid category ID' }, { status: 400 })
        }

        if (body.active) {
            await db.update(categories).set({ isHide: false }).where(eq(categories.categoryId, body.categoryId)).execute()
        } else {
            if (!body.name) {
                return NextResponse.json({ message: 'Category name is required' }, { status: 400 })
            }

            await db.update(categories).set({ category: body.name }).where(eq(categories.categoryId, body.categoryId)).execute()
        }

        return NextResponse.json({ message: 'Category updated successfully', categoryId: body.categoryId }, { status: 200 })
    } catch (error) {
        return handleError(error)
    }
}

export const DELETE = async (req: NextRequest) => {
    const body = (await req.json()) as { categoryId: number }
    try {
        const categoryId = Number(body.categoryId)
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
    PUT,
    DELETE,
}
