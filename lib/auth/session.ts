import { cookies } from 'next/headers'
import 'server-only'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hub.gumyo.net'

type Session = {
    user: {
        id: string
        name: string
        email: string
        role: string | null
        image: string | null
    }
}

export const getServerSession = async () => {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    if (!cookieHeader) return null

    try {
        const res = await fetch(`${API_URL}/api/auth/get-session`, {
            headers: {
                Cookie: cookieHeader,
            },
            cache: 'no-store',
        })

        if (!res.ok) return null

        const data = await res.json()
        if (!data?.user) return null

        return data as Session
    } catch {
        return null
    }
}
