'use client'

import { DateType, getFormattedDates } from '@shared/lib/date'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@shared/ui/chart'
import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'

const periodMap: { [key: string]: DateType } = {
    weekly: 'day',
    monthly: 'month',
}

type ChartDataWithFormedData = {
    visitor: number
    date: string
}

interface ChartDataWithFormedDataProps {
    chartData?: ChartDataWithFormedData[]
    currentPeriod: string
    gap: number
}

export const ChartDataWithFormedData = ({ chartData, currentPeriod, gap }: ChartDataWithFormedDataProps) => {
    const date = getFormattedDates(periodMap[currentPeriod], gap)

    currentPeriod === 'weekly' &&
        date.forEach((date) => !chartData?.find((data) => data.date === date) && chartData?.push({ date: date, visitor: 0 }))
    currentPeriod === 'monthly' &&
        date.forEach((date) => !chartData?.find((data) => data.date === date) && chartData?.push({ date: date, visitor: 0 }))

    return (
        <section className='flex flex-col gap-2'>
            <ChartContainer config={{}} className='max-h-72 w-full'>
                <BarChart data={chartData || []}>
                    <CartesianGrid />
                    <XAxis dataKey='date' />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
                    <Bar dataKey='visitors' fill='hsl(var(--sidebar-foreground))' />
                </BarChart>
            </ChartContainer>
        </section>
    )
}
