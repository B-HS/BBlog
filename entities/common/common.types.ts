export interface PaginationResponse<T> {
    results: T[]
    page: number
    limit: number
    perPage: number
    sort: string
    order: 'asc' | 'desc'
    hasMore?: boolean
    total?: number
}
