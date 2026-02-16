'use client'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hub.gumyo.net'

type ApiSuccessResponse<T> = {
    success: true
    data: T
}

type ApiErrorResponse = {
    success: false
    error: {
        code: string
        message: string
    }
}

export const clientFetch = async <T>(
    path: string,
    init?: RequestInit,
) => {
    const res = await fetch(`${API_URL}${path}`, {
        ...init,
        credentials: 'include',
        headers: {
            ...init?.headers,
        },
    })

    if (!res.ok) {
        const error = (await res.json().catch(() => null)) as ApiErrorResponse | null
        throw new Error(error?.error?.message ?? `API Error: ${res.status}`)
    }

    const json = await res.json() as ApiSuccessResponse<T>
    return json.data
}

export const clientFetchRaw = async (
    path: string,
    init?: RequestInit,
) => {
    const res = await fetch(`${API_URL}${path}`, {
        ...init,
        credentials: 'include',
    })

    if (!res.ok) {
        const error = (await res.json().catch(() => null)) as ApiErrorResponse | null
        throw new Error(error?.error?.message ?? `API Error: ${res.status}`)
    }

    return res
}
