import Image from 'next/image'
import { FrontmatterProps } from '../mdx/custom-mdx'
import dayjs from 'dayjs'
import { Badge } from '../ui/badge'
import Link from 'next/link'

const PostTile = async ({ post }: { post: Partial<FrontmatterProps> }) => {
    const { title, date, tags, thumbnail, file } = post
    return (
        <section className='w-72 h-72 relative group overflow-hidden border'>
            <Image className='aspect-square object-cover' src={`/image/${thumbnail}`} alt={`${title}-thumbnail`} width={288} height={288} />
            <Link href={`/article/${file?.split('.')[0]}`}>
                <section className='w-full h-full z-30 absolute top-0 left-0 bg-white dark:bg-black bg-opacity-80 dark:bg-opacity-80 flex flex-col translate-y-72 group-hover:translate-y-0 items-center justify-center transition-all duration-300 cursor-pointer border-2'>
                    <p className='text-3xl font-bold'>{title}</p>
                    <p>{dayjs(date).format('YYYY-MM-DD')}</p>
                    <section className='flex flex-wrap gap-2 px-5 justify-center'>
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
            </Link>
        </section>
    )
}

export default PostTile
