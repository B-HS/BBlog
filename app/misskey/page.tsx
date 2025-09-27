import { misskeyQueries } from '@entities/misskey'
import { NoMisskeyKey } from '@features/misskey'
import { MisskeyLayout } from '@widgets/misskey'
import { HydrationBoundary, QueryClient, dehydrate } from '@tanstack/react-query'

const MisskeyPreviewPage = async () => {
    if (!process.env.MISSKEY_USER_ID || !process.env.MISSKEY_INSTANCE_URL) {
        return <NoMisskeyKey />
    }

    const queryClient = new QueryClient()
    await queryClient.prefetchQuery(misskeyQueries.userInfo())

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <MisskeyLayout userId={process.env.MISSKEY_USER_ID} />
        </HydrationBoundary>
    )
}

export default MisskeyPreviewPage
