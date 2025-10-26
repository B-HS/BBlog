import { createCategory, getCategoryList } from '@entities/category'
import { QUERY_KEY } from '@lib/constants'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const categories = await getCategoryList()
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}

export const POST = async (request: NextRequest) => {
    try {
        const body = await request.json()
        const { category } = body

        if (!category || typeof category !== 'string') {
            return NextResponse.json({ error: 'Category name is required' }, { status: 400 })
        }

        const newCategory = await createCategory(category)

        revalidateTag(QUERY_KEY.CATEGORY.LIST, 'max')

        return NextResponse.json(newCategory)
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create category' }, { status: 500 })
    }
}
