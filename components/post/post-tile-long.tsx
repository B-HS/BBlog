import Image from 'next/image'
import { FrontmatterProps } from '../mdx/custom-mdx'
import dayjs from 'dayjs'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Calendar } from 'lucide-react'

const PostTileLong = async ({ post }: { post: Partial<FrontmatterProps> }) => {
    const { title, date, tags, thumbnail, file } = post
    return (
        <Link href={`/article/${file?.split('.')[0]}`}>
            <section className='w-full h-52 flex border hover:-translate-y-1 transition-transform'>
                <Image
                    className='aspect-square object-cover border'
                    src={`/image/${thumbnail}`}
                    alt={`${title}-thumbnail`}
                    width={288}
                    height={288}
                />
                <section className='flex flex-col justify-center px-5 gap-3'>
                    <section className='flex items-center text-xs text-foreground/75'>
                        <Calendar className='p-1' /> <p>{dayjs(date).format('YYYY-MM-DD')}</p>
                    </section>
                    <p className='text-5xl'>- {title}</p>
                    <section>
                        <section className='flex flex-wrap gap-2'>
                            {tags
                                ?.sort((prev, next) => prev.length - next.length)
                                ?.map((ele, idx) => (
                                    <Link href={`/article?tags=${ele}`} key={idx}>
                                        <Badge className='hover:text-background hover:bg-foreground' variant={'outline'}>
                                            {ele}
                                        </Badge>
                                    </Link>
                                ))}
                        </section>
                    </section>
                </section>
            </section>
        </Link>
    )
}

export default PostTileLong
