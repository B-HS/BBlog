import { fetchPosts } from '@/entities/post/post.api'
import { query } from '@/shared/utils/query-client'
import { QUERY_KEY } from '@/shared/utils/query-key'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { MainList } from '@/widgets/main'

const Page = async () => {
    const client = query()
    const noticeParams = { isNotice: true, limit: 3 }
    const recentParams = { limit: 3 }
    await Promise.all([
        client.prefetchQuery({
            queryKey: QUERY_KEY.POST.LIST(noticeParams),
            queryFn: async () => await fetchPosts(noticeParams),
        }),
        client.prefetchQuery({
            queryKey: QUERY_KEY.POST.LIST(recentParams),
            queryFn: async () => await fetchPosts(recentParams),
        }),
    ])

    return (
        <HydrationBoundary state={dehydrate(client)}>
            <main id='main-content' className='px-1.5' tabIndex={-1}>
                <section id='notice' aria-labelledby='notice-heading' className='mt-4'>
                    <h1 id='notice-heading' className='font-bold text-xl'>
                        Notice
                    </h1>

                    <ul aria-labelledby='notice-heading' className='mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        <MainList params={noticeParams} headingLevel='h2' />
                    </ul>
                </section>

                <section id='recent-posts' aria-labelledby='recent-heading' className='mt-10'>
                    <h2 id='recent-heading' className='font-bold text-xl'>
                        Recent Posts
                    </h2>

                    <ul aria-labelledby='recent-heading' className='mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                        <MainList params={recentParams} headingLevel='h3' />
                    </ul>
                </section>
            </main>
        </HydrationBoundary>
    )
}

export default Page
