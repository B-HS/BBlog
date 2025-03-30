import { db } from 'drizzle'
import { and, gte, lte, sql } from 'drizzle-orm'
import { visitors } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'
const handleError = (_: unknown, status: number = 500) => NextResponse.json({ message: 'An error occurred' }, { status })
export const GET = async (req: NextRequest) => {
    const startDateString = req.nextUrl.searchParams.get('startDate')
    const endDateString = req.nextUrl.searchParams.get('endDate')

    if (!startDateString || !endDateString) {
        return NextResponse.json({
            status: 400,
            json: { message: 'Invalid date range' },
        })
    }
    try {
        const startDate = new Date(startDateString)
        const endDate = new Date(endDateString)

        const type = req.nextUrl.searchParams.get('type') as 'day' | 'month'

        const dateField = type === 'month' ? sql`DATE_FORMAT(${visitors.createdAt}, '%Y-%m-01')` : sql`DATE(${visitors.createdAt})`

        const visitorData = await db
            .select({
                date: dateField,
                visitors: sql`COUNT(DISTINCT ${visitors.ip})`,
            })
            .from(visitors)
            .where(and(gte(visitors.createdAt, startDate), lte(visitors.createdAt, endDate)))
            .groupBy(dateField)
            .orderBy(dateField)

        return NextResponse.json(visitorData)
    } catch (error) {
        console.error(error)
        return handleError(error)
    }
}
