import dayjs from 'dayjs'
import { Briefcase, Calendar, Link2, MapPin } from 'lucide-react'
import { ElementType, FC } from 'react'

const InfoListItem = ({ Icon, text, link }: { Icon: ElementType; text: string; link?: string }) => (
    <section className='flex items-center gap-2 text-muted-foreground'>
        <Icon className='size-3' />
        {link ? (
            <a href={link} className='hover:underline'>
                {text}
            </a>
        ) : (
            text
        )}
    </section>
)

interface LogInfoListProps {
    logInfo: {
        createdAt: Date
        location: string
    }
}

export const LogInfoList: FC<LogInfoListProps> = ({ logInfo }) => {
    return (
        <section className='flex flex-col text-sm items-center sm:items-start'>
            <InfoListItem Icon={Briefcase} text='Frontend Developer' />
            <InfoListItem Icon={Calendar} text={`Log started from ${dayjs(logInfo.createdAt).format('YYYY. MM. DD')}`} />
            <InfoListItem Icon={Link2} text='https://github.com/B-HS' link='https://github.com/B-HS' />
            <InfoListItem Icon={MapPin} text={logInfo.location || 'Unknown'} />
        </section>
    )
}
