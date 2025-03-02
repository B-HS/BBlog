import Image from 'next/image'
import { MisskeyInfo } from '@entities/misskey'

export const MisskeyInfoBanner = ({ misskeyInfo }: { misskeyInfo: MisskeyInfo }) => {
    return (
        <section className='relative h-64 hover:h-72 transition-all'>
            <Image src={misskeyInfo.bannerUrl} alt='Misskey Banner' fill className='pointer-events-none select-none object-cover' priority={true} />
            <div className='absolute inset-0 bg-linear-to-b from-neutral-50/10 to-neutral-600/10' />
        </section>
    )
}
