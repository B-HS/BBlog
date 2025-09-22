import { getCategories } from '@/entities/category/category.services'
import { GetPostsRequest } from '@/entities/post'
import { fetchPosts } from '@/entities/post/post.api'
import { query } from '@/shared/utils/query-client'
import { QUERY_KEY } from '@/shared/utils/query-key'
import { PostList } from '@/widgets/post/post-list'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

interface PostListPageProps {
    searchParams: Promise<GetPostsRequest>
}

const PostListPage = async ({ searchParams }: PostListPageProps) => {
    const client = query()
    const params = await searchParams
    await Promise.all([
        client.prefetchQuery({
            queryKey: QUERY_KEY.POST.LIST(params),
            queryFn: async () => await fetchPosts(params),
        }),
        client.prefetchQuery({
            queryKey: QUERY_KEY.CATEGORY.LIST(),
            queryFn: async () => await getCategories(),
        }),
    ])

    console.log(client.getQueryData(QUERY_KEY.POST.LIST(params)))

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <main id='main-content' className='px-1.5 w-full' tabIndex={-1}>
                <section id='notice' aria-labelledby='notice-heading' className='flex flex-col gap-2'>
                    <h1 id='notice-heading' className='font-bold text-xl py-2'>
                        Articles
                    </h1>
                    <PostList params={params} />
                </section>
            </main>
        </HydrationBoundary>
    )
}

export default PostListPage
