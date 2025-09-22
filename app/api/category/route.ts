import { getCategories } from '@/entities/category/category.services'
import type { GetCategoriesRequest } from '@/entities/category/category.types'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams

        const params: GetCategoriesRequest = {
            isHide: searchParams.get('isHide') ? searchParams.get('isHide') === 'true' : false,
        }

        const response = await getCategories(params)

        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        console.error('Error fetching categories:', error)
        return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }
}