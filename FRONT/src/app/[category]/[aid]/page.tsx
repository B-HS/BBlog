import { getPostById } from '@/api/article/post'
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

const Article = async ({ params: { aid } }: { params: { aid: string } }) => {
    const data: Article = await getPostById(aid, true)

    return (
        <Flex className='min-h-screen flex-wrap justify-between'>
            <Flex className='posting flex-col bg-gray-700 flex-none w-9/12'>
                <p>{data.title}</p>
                <Separator />
            </Flex>
            <Flex className='flex-col bg-yellow-800 w-[23.5%]'></Flex>
        </Flex>
    )
}
export default Article
