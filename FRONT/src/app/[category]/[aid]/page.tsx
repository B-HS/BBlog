import { getPostById } from '@/api/article/post'
import ArticleContext from '@/components/article/articleContext'
import Flex from '@/components/flex'
import { Separator } from '@/components/ui/separator'

export interface Article {
    aid: number
    title: string
    context: string
    tags: string[]
    mekey: number
    fileseq: null | number
    hide: boolean
    github: null | string
    publishlink: null | string
    insertDate: null | string
}

const Article = async ({ params: { aid, category } }: { params: { aid: string; category: string } }) => {
    const data: Article = await getPostById(aid, true)
    return (
        <Flex className='flex-col flex-wrap justify-start max-w-5xl w-full'>
            {ArticleContext({ data, category })}
            <Separator className='my-5' />
            <Flex className='flex-col'>
                <header className='flex gap-1 items-baseline'>
                    <p className='text-2xl'>Comment</p>
                    <span className='text-xs opacity-80'>({0})</span>
                </header>
            </Flex>
        </Flex>
    )
}
export default Article
