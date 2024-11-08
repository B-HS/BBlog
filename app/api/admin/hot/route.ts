import { auth } from '@shared/auth'
import { db } from 'drizzle'
import { and, desc, eq, gte, like, lte, sql } from 'drizzle-orm'
import { posts, visitors } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
    const session = await auth()

    if (!session) {
        return NextResponse.json(
            {
                message: 'Unauthenticated',
            },
            {
                status: 401,
            },
        )
    }

    const startDateString = req.nextUrl.searchParams.get('startDate')
    const endDateString = req.nextUrl.searchParams.get('endDate')

    if (!startDateString || !endDateString) {
        return NextResponse.json({
            status: 400,
            json: { message: 'Invalid date range' },
        })
    }

    const startDate = new Date(startDateString)
    const endDate = new Date(endDateString)

    const hotArticleInfo = await db
        .select({
            title: posts.title,
            createdAt: posts.createdAt,
            path: visitors.path,
            visitCount: sql<number>`count(distinct ${visitors.ip})`.as('visitCount'),
        })
        .from(visitors)
        .rightJoin(posts, eq(visitors.path, sql`CONCAT('/article/', ${posts.postId})`))
        .where(and(like(visitors.path, '%/article/%'), gte(visitors.createdAt, startDate), lte(visitors.createdAt, endDate)))
        .groupBy(posts.title, posts.createdAt, visitors.path)
        .orderBy(desc(sql`visitCount`))
        .limit(10)
        .execute()

    return NextResponse.json(hotArticleInfo)
}
