export interface Category {
    id: string
    categoryId: number
    name: string
    articleCount: number
    createdAt: Date
    isHide: boolean
}

export interface GetCategoriesRequest {
    isHide?: boolean
}

export interface CategoriesListResponse {
    results: Category[]
    total: number
}