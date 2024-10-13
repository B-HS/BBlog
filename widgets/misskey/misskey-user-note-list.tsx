import { MisskeyInfo } from '@entities/misskey'
import { InfoListItem } from '@features/misskey'
import dayjs from 'dayjs'
import { Briefcase, Calendar, Link2, MapPin } from 'lucide-react'

export const MisskeyInfoItemList = ({ misskeyInfo }: { misskeyInfo: MisskeyInfo }) => {
    return (
        <section className='flex flex-col text-sm items-center sm:items-start'>
            <InfoListItem Icon={Briefcase} text='Frontend Developer' />
            <InfoListItem Icon={Calendar} text={`Misskey started on ${dayjs(misskeyInfo.createdAt).format('YYYY. MM. DD')}`} />
            <InfoListItem Icon={Link2} text='https://github.com/B-HS' link='https://github.com/B-HS' />
            <InfoListItem Icon={MapPin} text={misskeyInfo.location || 'Unknown'} />
        </section>
    )
}
