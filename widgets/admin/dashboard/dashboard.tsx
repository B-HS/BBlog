'use client'

import { adminQueries } from '@entities/admin'
import { ArticleRanking } from '@features/admin/article-ranking'
import { ChartDataWithFormedData, ChartHeaderWithButtons } from '@features/common'
import { DateType, getFormattedDates } from '@shared/lib/date'
import { Separator } from '@shared/ui/separator'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useState } from 'react'

const periodMap: { [key: string]: DateType } = {
    weekly: 'day',
    monthly: 'month',
}

export const Dashboard = () => {
    const [periodState, setPeriodState] = useState({ period: 'weekly', gap: 0 })

    const dateAry = getFormattedDates(periodMap[periodState.period], periodState.gap)
    const dateParams = {
        startDate: dateAry.at(0)!,
        endDate: dayjs(dateAry.at(-1)).add(1, 'day').format('YYYY-MM-DD'),
        type: periodMap[periodState.period],
    }

    const { data: visitorInfo } = useQuery(adminQueries.visitor(periodState, dateParams))
    const { data: hotarticleInfo } = useQuery(adminQueries.hotArticle(periodState, dateParams))

    const setPeriodWithResetGap = (newPeriod: string) => setPeriodState({ period: newPeriod, gap: 0 })
    const incrementGap = () => setPeriodState((prev) => ({ ...prev, gap: prev.gap + 1 }))
    const decrementGap = () => setPeriodState((prev) => ({ ...prev, gap: prev.gap - 1 }))

    return (
        <section className='flex flex-col gap-2 justify-evenly h-full'>
            <ChartHeaderWithButtons
                currentPeriod={periodState.period}
                next={incrementGap}
                prev={decrementGap}
                setCurrentPeriod={setPeriodWithResetGap}
            />
            <ChartDataWithFormedData chartData={visitorInfo || []} periodState={periodState} />
            <Separator />
            <ArticleRanking articleRanking={hotarticleInfo || []} />
        </section>
    )
}
