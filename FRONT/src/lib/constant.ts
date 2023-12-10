import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

const DELAY_AMOUNT = 0.15
const DELAY = (level: number) => level * DELAY_AMOUNT
const CURRENT_DATE = dayjs().utcOffset(9).format('YYYYMMDDHHmmss')

export { DELAY, DELAY_AMOUNT, CURRENT_DATE }
