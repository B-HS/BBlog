import { cookies } from 'next/headers'
import 'server-only'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://hub.gumyo.net'

type FetchOptions = {
    revalidate?: number
    tags?: string[]
    cache?: RequestCache
}

type Pagination = {
    page: number
    limit: number
    total: number
    totalPages: number
}

type ApiErrorResponse = {
    success: false
    error: {
        code: string
        message: string
    }
}

const buildFetchOptions = async (init?: RequestInit & FetchOptions) => {
    const { revalidate, tags, cache, ...restInit } = init ?? {}
    const cookieStore = await cookies()
    const cookieHeader = cookieStore.toString()

    return {
        ...restInit,
        headers: {
            ...restInit?.headers,
            ...(cookieHeader && { Cookie: cookieHeader }),
        },
        next: {
            ...(revalidate !== undefined && { revalidate }),
            ...(tags && { tags }),
        },
        ...(cache && { cache }),
    }
}

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        const error = (await res.json().catch(() => null)) as ApiErrorResponse | null
        throw new Error(error?.error?.message ?? `API Error: ${res.status}`)
    }
    return res.json()
}

export const serverFetchData = async <T>(
    path: string,
    init?: RequestInit & FetchOptions,
) => {
    const options = await buildFetchOptions(init)
    const res = await fetch(`${API_URL}${path}`, options)
    const json = await handleResponse(res)
    return json.data as T
}

export const serverFetchPaginated = async <T>(
    path: string,
    init?: RequestInit & FetchOptions,
) => {
    const options = await buildFetchOptions(init)
    const res = await fetch(`${API_URL}${path}`, options)
    const json = await handleResponse(res)
    return {
        data: json.data as T[],
        pagination: json.pagination as Pagination,
    }
}
