import { Badge } from '@shared/ui/badge'

export const Tags = ({ tags }: { tags?: string[] }) => {
    return tags
        ?.sort((prev, next) => prev.length - next.length)
        ?.map((ele, idx) => (
            <Badge className='hover:text-background hover:bg-foreground z-30 cursor-pointer' variant={'outline'} key={idx}>
                {ele}
            </Badge>
        ))
}
