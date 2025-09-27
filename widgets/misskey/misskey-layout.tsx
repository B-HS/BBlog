'use client'

import { misskeyQueries } from '@entities/misskey'
import { Card, CardContent } from '@shared/ui/card'
import { useQuery } from '@tanstack/react-query'
import { MisskeyInfoBanner } from './misskey-info-banner'
import { MisskeyMainInformation } from './misskey-main-information'
import { MisskeyInfoItemList } from './misskey-user-note-list'
import { MisskeyPostList } from './misskey-post-list'

export const MisskeyLayout = ({ userId }: { userId: string }) => {
    const { data: misskeyInfo } = useQuery(misskeyQueries.userInfo())

    if (!misskeyInfo) return null

    return (
        <div className='flex flex-col gap-2 w-full'>
            <Card className='w-full mx-auto border-none shadow-none py-0'>
                <CardContent className='p-0'>
                    <MisskeyInfoBanner misskeyInfo={misskeyInfo} />
                    <section className='px-6 py-3 sm:px-8 sm:py-6'>
                        <MisskeyMainInformation misskeyInfo={misskeyInfo} />
                        <MisskeyInfoItemList misskeyInfo={misskeyInfo} />
                    </section>
                </CardContent>
            </Card>
            <MisskeyPostList userId={userId} />
        </div>
    )
}
