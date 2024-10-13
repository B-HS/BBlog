import { MisskeyInfo } from '@entities/misskey'

export const MisskeyInfoBanner = ({ misskeyInfo }: { misskeyInfo: MisskeyInfo }) => {
    return (
        <section
            className='h-64 bg-gradient-to-b from-neutral-50/10 to-neutral-600/10 hover:h-96 transition-all'
            style={{
                backgroundImage: `url(${misskeyInfo.bannerUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        />
    )
}
