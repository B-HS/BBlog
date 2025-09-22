import { getPosts } from '@/entities/post/post.services'
import type { GetPostsRequest } from '@/entities/post/post.types'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (request: NextRequest) => {
    try {
        const searchParams = request.nextUrl.searchParams

        const params: GetPostsRequest = {
            tagId: searchParams.get('tagId') || undefined,
            categoryId: searchParams.get('categoryId') || undefined,
            page: searchParams.get('page') ? Number(searchParams.get('page')) : undefined,
            limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : undefined,
            perPage: searchParams.get('perPage') ? Number(searchParams.get('perPage')) : undefined,
            sort: searchParams.get('sort') || undefined,
            order: (searchParams.get('order') as 'asc' | 'desc') || undefined,
            search: searchParams.get('search') || undefined,
            isHide: searchParams.get('isHide') ? searchParams.get('isHide') === 'true' : undefined,
            isNotice: searchParams.get('isNotice') ? searchParams.get('isNotice') === 'true' : undefined,
            isComment: searchParams.get('isComment') ? searchParams.get('isComment') === 'true' : undefined,
        }

        const response = await getPosts(params)

        return NextResponse.json(response, { status: 200 })
    } catch (error) {
        console.error('Error fetching posts:', error)
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 })
    }
}
