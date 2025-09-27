import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (_: NextRequest, { params }: { params: Promise<{ tagId: string }> }) => {
    const { tagId } = await params
    revalidateTag(tagId)
    return NextResponse.json({ revalidated: true, tagId })
}
