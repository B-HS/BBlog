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

    const uniqueVisits = db
        .select({
            ip: visitors.ip,
            path: visitors.path,
            visitDate: sql`DATE(${visitors.createdAt})`.as('visitDate'),
            rn: sql`ROW_NUMBER() OVER (PARTITION BY ${visitors.ip}, ${visitors.path}, DATE(${visitors.createdAt}))`.as('rn'),
        })
        .from(visitors)
        .where(and(gte(visitors.createdAt, startDate), lte(visitors.createdAt, endDate)))
        .as('uniqueVisits')

    const hotArticleInfo = await db
        .with(uniqueVisits)
        .select({
            title: posts.title,
            createdAt: posts.createdAt,
            path: uniqueVisits.path,
            visitCount: sql<number>`COUNT(${uniqueVisits.ip})`.as('visitCount'),
        })
        .from(uniqueVisits)
        .rightJoin(posts, eq(uniqueVisits.path, sql`CONCAT('/article/', ${posts.postId})`))
        .where(and(like(uniqueVisits.path, '%/article/%'), eq(uniqueVisits.rn, 1)))
        .groupBy(posts.title, posts.createdAt, uniqueVisits.path)
        .orderBy(desc(sql`visitCount`))
        .limit(10)
        .execute()

    return NextResponse.json(hotArticleInfo)
}
