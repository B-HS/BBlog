import { Button } from '@shared/ui/button'
import Link from 'next/link'

export const Tags = ({ tags }: { tags?: string[] }) => {
    return tags
        ?.sort((prev, next) => prev.length - next.length)
        ?.map((ele, idx) => (
            <Button className='z-30 rounded-sm cursor-default cursor-pointer' variant={'outline'} key={idx} size={'sm'} asChild>
                <Link href={`/tag/${ele}`} className='flex items-center !no-underline'>
                    <span>#</span>
                    <span>{ele}</span>
                </Link>
            </Button>
        ))
}
