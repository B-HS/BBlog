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
    const [currentPeriod, setCurrentPeriod] = useState('weekly')
    const [gap, setGap] = useState(0)

    const { data } = useQuery({
        queryKey: ['visitor', currentPeriod, gap],
        queryFn: async () => {
            const searchParam = new URLSearchParams()
            const dateAry = getFormattedDates(periodMap[currentPeriod], gap)
            searchParam.append('startDate', dateAry.at(0)!)
            searchParam.append('endDate', dateAry.at(-1)!)
            searchParam.append('type', periodMap[currentPeriod])
            return await fetch('/api/admin/chart?' + searchParam.toString()).then((res) => res.json())
        },
    })

    return (
        <section className='flex flex-col gap-2'>
            <ChartHeaderWithButtons
                currentPeriod={currentPeriod}
                next={() => setGap((prev) => prev + 1)}
                prev={() => setGap((prev) => prev - 1)}
                setCurrentPeriod={setCurrentPeriod}
            />
            <ChartDataWithFormedData chartData={data || []} currentPeriod={currentPeriod} gap={gap} />
            <Separator />
        </section>
    )
}
