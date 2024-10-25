import dayjs from 'dayjs'

export type TimeUnit = 'second' | 'minute' | 'hour'

export const convertDate = (date: string | Date) => {
    const _date = dayjs(date)
    return _date.hour() < 12 ? _date.format('YYYY년 MM월 DD일 오전 hh:mm') : _date.format('YYYY년 MM월 DD일 오후 hh:mm')
}

export const convertNumberToDate = (value: number | string, type: TimeUnit, targetType: TimeUnit, isAuto: boolean = false): string => {
    const numberValue = typeof value === 'string' ? parseFloat(value) : value

    const conversionRates: Record<TimeUnit, number> = {
        second: 1,
        minute: 60,
        hour: 3600,
    }

    const suffixMap: Record<TimeUnit, string> = {
        second: '초',
        minute: '분',
        hour: '시간',
    }

    if (isAuto) {
        if (numberValue >= 3600) {
            targetType = 'hour'
        } else if (numberValue >= 60) {
            targetType = 'minute'
        } else {
            targetType = 'second'
        }
    }

    const convertedValue = (numberValue * conversionRates[type]) / conversionRates[targetType]

    return `${convertedValue.toFixed(1)}${suffixMap[targetType]}`
}

export const convertSecondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    let result = ''
    if (hours > 0) result += `${hours}시간`
    if (minutes > 0) result += ` ${minutes}분`
    if (secs > 0) result += ` ${secs}초`

    return result.trim()
}

export type DateType = 'day' | 'week' | 'month'

export const getFormattedDates = (type: DateType, gap: number = 0): string[] => {
    const today = dayjs()

    if (['week', 'day'].includes(type)) {
        const dayOfWeek = today.day()
        const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
        const startOfWeek = today.add(diff + gap * 7, 'day')

        return Array(7)
            .fill(0)
            .map((_, i) => startOfWeek.add(i, 'day').format('YYYY-MM-DD'))
    }

    if (type === 'month') {
        const currentMonth = today.month() + 1
        const startMonth = currentMonth >= 7 ? 7 : 1
        const endMonth = currentMonth >= 7 ? 12 : 6

        const baseDate = today.add(gap, 'year')
        const adjustedStartMonth = startMonth
        const monthsToReturn = endMonth - startMonth + 1

        return Array(monthsToReturn)
            .fill(0)
            .map((_, i) =>
                baseDate
                    .month(adjustedStartMonth + i - 1)
                    .date(1)
                    .format('YYYY-MM-DD'),
            )
    }

    return []
}
