import { articleQueries } from '@entities/article'
import { categoryQueries } from '@entities/category'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'
import { Articles } from '@features/article'

const ArticleListPage = async (props: { searchParams: Promise<{ categoryId?: string; keywords?: string }> }) => {
    const searchParams = await props.searchParams
    const categoryId = searchParams.categoryId ? Number(searchParams.categoryId) : undefined
    const keywords = searchParams.keywords

    const filters: { categoryId?: number; keywords?: string } = {}
    if (categoryId) filters.categoryId = categoryId
    if (keywords) filters.keywords = keywords

    const queryClient = new QueryClient()

    await Promise.all([queryClient.prefetchQuery(categoryQueries.all()), queryClient.prefetchInfiniteQuery(articleQueries.list(filters))])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Articles initialCategoryId={categoryId} initialKeywords={keywords} />
        </HydrationBoundary>
    )
}

export default ArticleListPage
