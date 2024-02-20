'use client'
import { useRouter } from 'next/navigation'
import { Badge } from '../ui/badge'

const Tags = ({ tags }: { tags?: string[] }) => {
    const router = useRouter()
    return tags
        ?.sort((prev, next) => prev.length - next.length)
        ?.map((ele, idx) => (
            <Badge
                className='hover:text-background hover:bg-foreground z-30 cursor-pointer'
                variant={'outline'}
                key={idx}
                onClick={() => router.push(`/article?tags=${ele}`)}
            >
                {ele}
            </Badge>
        ))
}

export default Tags
