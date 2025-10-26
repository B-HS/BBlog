import { getLogUserInfoByUserId } from '@entities/log'
import { LogInfoList } from '@features/log/log-info-list'
import { LOG_USER_ID } from '@lib/constants'
import BannerImage from '@lib/images/banner.jpeg'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Image } from '@ui/image'
import { FC } from 'react'

export const LogPageInfo: FC = async () => {
    const logInfo = await getLogUserInfoByUserId(LOG_USER_ID)
    return (
        <div>
            <section className='relative h-64 hover:h-72 transition-all'>
                <Image src={BannerImage.src} alt='Log Banner' fill className='pointer-events-none select-none object-cover' priority={true} />
                <div className='absolute inset-0 bg-linear-to-b from-neutral-50/10 to-neutral-600/10' />
            </section>

            <section className='px-6 py-3 sm:px-8 sm:py-6'>
                <section className='flex flex-col sm:flex-row items-center sm:items-end -mt-20 mb-3.5 gap-5'>
                    <Avatar className='size-32 border border-border bg-card'>
                        <AvatarImage src={logInfo?.image || ''} alt='Profile picture' />
                        <AvatarFallback>{logInfo?.name}</AvatarFallback>
                    </Avatar>
                    <section className='flex-1 text-center sm:text-left'>
                        <h1 className='text-2xl font-bold'>{logInfo?.name}</h1>
                        <p className='text-muted-foreground'>{logInfo?.email}</p>
                    </section>
                </section>
                <p className='py-2 text-center sm:text-start'>テッテレー</p>
                <LogInfoList logInfo={{ createdAt: logInfo?.createdAt || new Date('2023-04-01'), location: 'South Korea @ Seoul' }} />
            </section>
        </div>
    )
}
