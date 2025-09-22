import { Post } from '@/entities/post'
import { getPostById } from '@/entities/post/post.services'
import { query } from '@/shared/utils/query-client'
import { QUERY_KEY } from '@/shared/utils/query-key'
import { PostDetail } from '@/widgets/post/post-detail'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export const PostDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params
    const client = query()

    await Promise.all([
        client.prefetchQuery({
            queryKey: QUERY_KEY.POST.DETAIL(id),
            queryFn: () => getPostById(id),
        }),
    ])

    const post = client.getQueryData(QUERY_KEY.POST.DETAIL(id)) as Post

    console.log(post)

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <PostDetail post={post} />
        </HydrationBoundary>
    )
}

export default PostDetailPage
