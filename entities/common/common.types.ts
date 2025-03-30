export interface ImageList {
    name: string
    url: string
    date: string
}

export type Pagination = {
    page: number
    limit: number
    total: number
    totalPage: number
    prev: boolean
    next: boolean
}
