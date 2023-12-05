import { getPostById } from '@/api/article/post'
import ArticleComement, { Comment } from '@/components/article/articleComment'
import ArticleContext from '@/components/article/articleContext'
import Flex from '@/components/flex'
import { Separator } from '@/components/ui/separator'

const Article = async ({ params: { aid, category } }: { params: { aid: string; category: string } }) => {
    const dummyCommentList = [
        {
            aid: 2,
            cid: 1,
            img: 'https://picsum.photos/200/300',
            commentorder: 1,
            nickname: 'guest1',
            context: 'comment 1',
            uppercid: null,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 2,
            nickname: 'guest2',
            commentorder: 1,
            img: 'https://picsum.photos/200/300',
            context: 'comment 1 - reply',
            uppercid: 1,
            insertdate: '20231201000000',
        },
        {
            aid: 2,
            cid: 3,
            nickname: 'admin',
            commentorder: 2,
            img: 'https://picsum.photos/200/300',
            context: 'comment2',
            uppercid: null,
            insertdate: '20231201000000',
        },
    ] as Comment[]

    const data = await getPostById(aid, true)
    return (
        <Flex className='flex-col flex-wrap justify-start max-w-6xl w-full'>
            <ArticleContext data={data} category={category} />
            <Separator className='my-5' />
            <Flex className='flex-col gap-5'>
                <header className='flex gap-1 items-baseline mb-5'>
                    <p className='text-2xl'>Comment</p>
                    <span className='text-xs opacity-80'>({0})</span>
                </header>
                {/* TODO 계층형으로 데이터 가공해서 댓글-대댓글 구현 필요 */}
                {dummyCommentList.map((comment, idx) => (
                    <ArticleComement key={idx} data={comment} />
                ))}
            </Flex>
        </Flex>
    )
}
export default Article
