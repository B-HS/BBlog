'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import dayjs from 'dayjs'
import { useState } from 'react'
import { ActiveModifiers, SelectSingleEventHandler } from 'react-day-picker'

const PopCalendar = ({ date, onChange }: { date?: Date; onChange: SelectSingleEventHandler }) => {
    const [open, setOpen] = useState(false)
    const selectEvt = (day: Date | undefined, selectedDay: Date, activeModifiers: ActiveModifiers, e: any) => {
        setOpen(false)
        onChange(day, selectedDay, activeModifiers, e)
    }
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant={'outline'} className={cn('w-[240px] pl-3 text-left font-normal')}>
                    <span className='text-neutral-300'>{date ? dayjs(date).format('YYYY-MM-DD').toString() : 'Start Date'}</span>
                    <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
                <Calendar mode='single' selected={date} onSelect={selectEvt} initialFocus />
            </PopoverContent>
        </Popover>
    )
}

export default PopCalendar
