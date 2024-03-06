import Link from 'next/link'
import { Separator } from '../ui/separator'

export interface TocProps {
    heading: string
    link: string
}

const TocLink = ({ toc }: { toc: TocProps }) => {
    return (
        <Link className='text-foreground/70 py-1 hover:text-foreground transition-all truncate' href={`#${toc.link}`}>
            {toc.heading}
        </Link>
    )
}

const Toc = ({ toc }: { toc: TocProps[] }) => {
    return (
        <section className='fixed w-72 mt-5 mx-5  bg-neutral-50 dark:bg-neutral-900 rounded flex flex-col 2xl:max-w-72 2xl:p-5 max-w-0 overflow-hidden transition-all'>
            {toc.map((ele, idx) => (
                <TocLink toc={ele} key={idx} />
            ))}
            <Separator className='my-5' />
            <TocLink toc={{ heading: 'Comment', link: 'comment-section' }} />
        </section>
    )
}

export default Toc
