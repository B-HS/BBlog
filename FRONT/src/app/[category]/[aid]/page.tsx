import { getPostById } from '@/api/article/post'
import ArticleContext from '@/components/article/articleContext'
import CommentList from '@/components/article/commentList'
import Flex from '@/components/flex'
import { Separator } from '@/components/ui/separator'

const Article = async ({ params: { aid, category } }: { params: { aid: string; category: string } }) => {
    const article = (await getPostById(aid, true)) || []
    return (
        <Flex className='flex-col flex-wrap justify-start w-full'>
            <ArticleContext data={article} category={category} />
            <Separator className='my-5' />
            <CommentList />
        </Flex>
    )
}
export default Article
