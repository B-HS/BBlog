import { getCommentByAid } from '@/api/article/comment'
import { getPostById } from '@/api/article/post'
import ArticleComement, { Comment } from '@/components/article/articleComment'
import ArticleContext from '@/components/article/articleContext'
import Flex from '@/components/flex'
import UpdownAnime from '@/components/transition/updown'
import { Separator } from '@/components/ui/separator'

const Article = async ({ params: { aid, category } }: { params: { aid: string; category: string } }) => {
    const createCommentHierarchy = (comments: Comment[], uppercid: number = 0, level = 0): Comment[] => {
        if (!Array.isArray(comments)) return []
        const filteredItems = comments.filter((item) => item.uppercid === uppercid).sort((a, b) => a.commentorder - b.commentorder)
        return filteredItems.map((item: Comment) => ({
            aid: item.aid,
            cid: item.cid,
            nickname: item.nickname,
            commentorder: item.commentorder,
            img: item.img,
            context: item.context,
            uppercid: item.uppercid,
            insertdate: item.insertdate,
            level,
            children: createCommentHierarchy(comments, item.cid, level + 1),
        }))
    }

    const article = (await getPostById(aid, true)) || []
    const comment = (await getCommentByAid(aid, true)) || []
    return (
        <Flex className='flex-col flex-wrap justify-start w-full'>
            <ArticleContext data={article} category={category} />
            <Separator className='my-5' />
            <Flex className='flex-col gap-5'>
                <header className='flex gap-1 items-baseline mb-5'>
                    <p className='text-2xl'>Comment</p>
                    <span className='text-xs opacity-80'>({comment.length})</span>
                </header>
                {createCommentHierarchy(comment).map((item) => (
                    <UpdownAnime key={item.cid}>
                        <ArticleComement key={item.cid} data={item} />
                        {item.children && item.children.map((chiItem) => <ArticleComement key={chiItem.cid} data={chiItem} />)}
                    </UpdownAnime>
                ))}
            </Flex>
        </Flex>
    )
}
export default Article
