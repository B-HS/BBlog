import { LOG_USER_ID } from '@lib/constants'
import { LogMessageList } from '@widgets/log/log-message-list'
import { LogPageInfo } from '@widgets/log/log-page-info'
import { Suspense } from 'react'

const LogPage = async () => {
    return (
        <main>
            <Suspense>
                <LogPageInfo />
            </Suspense>
            <section className='px-6 py-3 sm:px-8 sm:py-6'>
                <LogMessageList userId={LOG_USER_ID} />
            </section>
        </main>
    )
}

export default LogPage
