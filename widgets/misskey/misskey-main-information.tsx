import { MisskeyInfo } from '@entities/misskey'
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar'
import { Fragment } from 'react'

export const MisskeyMainInformation = ({ misskeyInfo }: { misskeyInfo: MisskeyInfo }) => {
    return (
        <Fragment>
            <section className='flex flex-col sm:flex-row items-center sm:items-end -mt-20 mb-3.5 gap-5'>
                <Avatar className='size-32 border border-foreground bg-card'>
                    <AvatarImage src={misskeyInfo.avatarUrl} alt='Profile picture' className='mt-1.5' />
                    <AvatarFallback>{misskeyInfo.name}</AvatarFallback>
                </Avatar>
                <section className='flex-1 text-center sm:text-left'>
                    <h1 className='text-2xl font-bold'>{misskeyInfo.name}</h1>
                    <p className='text-muted-foreground'>@{misskeyInfo.anchor}</p>
                </section>
            </section>
            <p className='py-2 text-center sm:text-start'>{misskeyInfo.description}</p>
        </Fragment>
    )
}
