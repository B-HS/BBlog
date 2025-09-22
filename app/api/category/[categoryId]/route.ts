import { NextRequest, NextResponse } from 'next/server'
import { getCategoryById } from '@/entities/category/category.services'

export const GET = async (
    _request: NextRequest,
    { params }: { params: Promise<{ categoryId: string }> }
) => {
    try {
        const { categoryId } = await params

        if (!categoryId) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            )
        }

        const response = await getCategoryById(categoryId)

        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        console.error('Error fetching category:', error)
        return NextResponse.json(
            { error: 'Failed to fetch category' },
            { status: 500 }
        )
    }
}