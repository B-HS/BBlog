'use client'

import { Button } from '@shared/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const periods = ['weekly', 'monthly']

interface ChartHeaderWithButtonsProps {
    currentPeriod: string
    // eslint-disable-next-line no-unused-vars
    setCurrentPeriod: (period: string) => void
    prev: () => void
    next: () => void
}

export const ChartHeaderWithButtons = ({ currentPeriod, setCurrentPeriod, prev, next }: ChartHeaderWithButtonsProps) => {
    return (
        <div className='flex items-center gap-2 justify-between flex-wrap py-1'>
            <span className='text-2xl font-bold mb-2'>Visitors</span>
            <section className='flex flex-wrap items-center gap-2'>
                {periods.map((period) => (
                    <Button key={period} variant={currentPeriod === period ? 'default' : 'outline'} onClick={() => setCurrentPeriod(period)}>
                        {period.charAt(0).toUpperCase() + period.slice(1)}
                    </Button>
                ))}

                <Button onClick={prev} size={'icon'} variant={'outline'}>
                    <ArrowLeft />
                </Button>
                <Button onClick={next} size={'icon'} variant={'outline'}>
                    <ArrowRight />
                </Button>
            </section>
        </div>
    )
}
