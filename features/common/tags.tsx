import { Badge } from '@shared/ui/badge'

export const Tags = ({ tags }: { tags?: string[] }) => {
    return tags
        ?.sort((prev, next) => prev.length - next.length)
        ?.map((ele, idx) => (
            <Badge className='z-30 rounded-sm cursor-default' variant={'outline'} key={idx}>
                <section className='flex items-center'>
                    <span>#</span>
                    <span>{ele}</span>
                </section>
            </Badge>
        ))
}
