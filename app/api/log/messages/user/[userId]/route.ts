import { NextRequest, NextResponse } from 'next/server'

export const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  const { userId } = await params
  const { searchParams } = new URL(request.url)
  const page = searchParams.get('page') || '1'
  const size = searchParams.get('size') || '10'

  try {
    const response = await fetch(
      `https://log.gumyo.net/api/messages/user/${userId}?page=${page}&size=${size}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch messages' },
      { status: 500 }
    )
  }
}
