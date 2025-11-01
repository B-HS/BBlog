import { LogMessageList } from '@widgets/log/log-message-list'
import { LogPageHeader } from '@widgets/log/log-page-header'
import { Suspense } from 'react'

const LogPage = async () => {
    return (
        <main>
            <Suspense>
                <LogPageHeader />
            </Suspense>
            <section className='px-6 py-3 sm:px-8 sm:py-6'>
                <LogMessageList />
            </section>
        </main>
    )
}

export default LogPage
