'use client'

import { ChartDataWithFormedData, ChartHeaderWithButtons } from '@features/common'
import { DateType, getFormattedDates } from '@shared/lib/date'
import { Separator } from '@shared/ui/separator'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const periodMap: { [key: string]: DateType } = {
    weekly: 'day',
    monthly: 'month',
}

export const Dashboard = () => {
    const [periodState, setPeriodState] = useState({ period: 'weekly', gap: 0 })

    const { data } = useQuery({
        queryKey: ['visitor', periodState],
        queryFn: async () => {
            const searchParam = new URLSearchParams()
            const dateAry = getFormattedDates(periodMap[periodState.period], periodState.gap)
            searchParam.append('startDate', dateAry.at(0)!)
            searchParam.append('endDate', dateAry.at(-1)!)
            searchParam.append('type', periodMap[periodState.period])
            return await fetch('/api/admin/chart?' + searchParam.toString()).then((res) => res.json())
        },
    })

    const setPeriodWithResetGap = (newPeriod: string) => setPeriodState({ period: newPeriod, gap: 0 })
    const incrementGap = () => setPeriodState((prev) => ({ ...prev, gap: prev.gap + 1 }))
    const decrementGap = () => setPeriodState((prev) => ({ ...prev, gap: prev.gap - 1 }))

    return (
        <section className='flex flex-col gap-2'>
            <ChartHeaderWithButtons
                currentPeriod={periodState.period}
                next={incrementGap}
                prev={decrementGap}
                setCurrentPeriod={setPeriodWithResetGap}
            />
            <ChartDataWithFormedData chartData={data || []} periodState={periodState} />
            <Separator />
        </section>
    )
}
