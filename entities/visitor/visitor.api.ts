import { db } from 'drizzle'
import { visitors } from 'drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'
import { Visitor } from './visitor.types'

const POST = async (req: NextRequest) => {
    try {
        const body = (await req.json()) as Partial<Visitor>
        await db
            .insert(visitors)
            .values({
                ip: body.ip || 'Unknown',
                path: body.path || 'Unknown',
                createdAt: new Date(),
            })
            .$returningId()
            .execute()

        return NextResponse.json({ message: 'OK' }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: 'Failed' }, { status: 500 })
    }
}

export const VisitorApi = { POST }
