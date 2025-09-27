export const queryKeys = {
    article: {
        all: ['articles'] as const,
        lists: () => [...queryKeys.article.all, 'list'] as const,
        list: (filters: { categoryId?: number; keywords?: string }) => {
            const key: any[] = [...queryKeys.article.lists()]
            if (filters.categoryId !== undefined) key.push('categoryId', filters.categoryId)
            if (filters.keywords !== undefined) key.push('keywords', filters.keywords)
            return key
        },
        details: () => [...queryKeys.article.all, 'detail'] as const,
        detail: (id: number | string) => [...queryKeys.article.details(), id] as const,
        byTag: (tag: string) => [...queryKeys.article.all, 'tag', tag] as const,
    },
    category: {
        all: ['categories'] as const,
    },
    comment: {
        all: ['comments'] as const,
        byPost: (post: number) => [...queryKeys.comment.all, post] as const,
    },
    admin: {
        visitor: (periodState: { period: string; gap: number }) => ['visitor', periodState] as const,
        hotArticle: (periodState: { period: string; gap: number }) => ['hotarticle', periodState] as const,
        articles: (page: number) => ['articles', page] as const,
    },
    temporalPost: {
        all: ['savedList'] as const,
    },
    misskey: {
        posts: ['posts'] as const,
    },
}
