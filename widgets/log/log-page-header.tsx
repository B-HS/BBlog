'use client'

import { useSession } from '@entities/auth.client'
import { LogInfoList } from '@features/log/log-info-list'
import BannerImage from '@lib/images/banner.jpeg'
import UserProfileImage from '@lib/images/seyanaprofile.png'
import { Avatar, AvatarFallback, AvatarImage } from '@ui/avatar'
import { Image } from '@ui/image'
import { User } from 'better-auth'
import { LogMessageForm } from './log-message-form'

export const LogPageHeader = () => {
    const { data: session } = useSession()
    const user = session?.user as (User & { role?: string }) | undefined

    return (
        <div>
            <section className='relative h-64 hover:h-72 transition-all'>
                <Image src={BannerImage.src} alt='Log Banner' fill className='pointer-events-none select-none object-cover' priority={true} />
                <div className='absolute inset-0 bg-linear-to-b from-neutral-50/10 to-neutral-600/10' />
            </section>

            <section className='px-6 py-3 sm:px-8 sm:py-6'>
                <section className='flex flex-col sm:flex-row items-center sm:items-end -mt-20 mb-3.5 gap-5'>
                    <Avatar className='size-32 border border-border bg-card/50'>
                        <AvatarImage className='translate-y-2' src={UserProfileImage.src} alt='Profile picture' />
                        <AvatarFallback>{user?.name}</AvatarFallback>
                    </Avatar>
                    <section className='flex-1 text-center sm:text-left'>
                        <h1 className='text-2xl font-bold'>{user?.name}</h1>
                        <p className='text-muted-foreground'>{user?.email}</p>
                    </section>
                </section>
                <p className='py-2 text-center sm:text-start'>テッテレー</p>
                <LogInfoList logInfo={{ createdAt: user?.createdAt || new Date('2023-04-01'), location: 'South Korea @ Seoul' }} />
            </section>

            {user?.role === 'admin' && <LogMessageForm userImage={user?.image} userName={user?.name} />}
        </div>
    )
}
