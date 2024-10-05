import { StarIcon } from 'lucide-react'

export const StarRating = ({ rating }: { rating: number }) => {
    const stars = Array.from({ length: 5 }).map((_, idx) => {
        const fill = Math.floor(Math.min(Math.max(rating / 2 - idx, 0), 1) * 100)

        return (
            <div key={idx} className='relative size-5'>
                <StarIcon className='size-full absolute' strokeWidth={0} fill='#DDD' />
                <StarIcon className='size-full absolute' strokeWidth={0} fill='#777' style={{ clipPath: `inset(0 ${100 - fill}% 0 0)` }} />
            </div>
        )
    })

    return <div className='flex'>{stars}</div>
}
