import { requestUserShowInfo } from '@entities/misskey'
import { NoMisskeyKey } from '@features/misskey'
import { Card, CardContent } from '@shared/ui/card'
import { MisskeyInfoBanner, MisskeyInfoItemList, MisskeyMainInformation, MisskeyPostList } from '@widgets/misskey'

const MisskeyPreviewPage = async () => {
    const misskeyInfo = await requestUserShowInfo()

    return !process.env.MISSKEY_USER_ID || !process.env.MISSKEY_INSTANCE_URL ? (
        <NoMisskeyKey />
    ) : (
        <section className='flex flex-col gap-2 w-full'>
            <Card className='w-full mx-auto border-none shadow-none py-0'>
                <CardContent className='p-0'>
                    <MisskeyInfoBanner misskeyInfo={misskeyInfo} />
                    <section className='px-6 py-3 sm:px-8 sm:py-6'>
                        <MisskeyMainInformation misskeyInfo={misskeyInfo} />
                        <MisskeyInfoItemList misskeyInfo={misskeyInfo} />
                    </section>
                </CardContent>
            </Card>
            <MisskeyPostList userId={process.env.MISSKEY_USER_ID} />
        </section>
    )
}

export default MisskeyPreviewPage
