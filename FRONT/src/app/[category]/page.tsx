'use client'
import { getListByMenuName } from '@/api/article/post'
import ArticleCard from '@/components/article/articleCard'
import { Article } from '@/components/article/articleContext'
import PageSize from '@/components/article/pagesize'
import Pagination from '@/components/article/pagination'
import Flex from '@/components/flex'
import UpdownAnime from '@/components/transition/updown'
import { DELAY } from '@/lib/constant'
import { Layers3Icon } from 'lucide-react'
import { useEffect, useState } from 'react'

const ArticleList = ({ params: { category } }: { params: { category: string } }) => {
    const [articleList, setArticleList] = useState<Article[]>()
    const [page, setPage] = useState(1)
    const [count, setCount] = useState(5)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        const getArticle = async () => {
            const pagedArticleList = await getListByMenuName(category, page, count)
            setTotalPage(pagedArticleList.totalPages || 0)
            setArticleList(pagedArticleList.content || [])
        }
        getArticle()
    }, [category, count, page])

    return (
        <UpdownAnime delay={DELAY(2)}>
            <Flex className='flex gap-1 items-center'>
                <Layers3Icon className='h-5' />
                <p className='text-2xl'>{category.toUpperCase()}</p>
            </Flex>
            <Flex className='flex-col'>
                <Flex className='flex-col gap-3'>
                    {articleList?.map((ele, idx) => (
                        <UpdownAnime delay={DELAY(1.5 + idx)} key={ele.aid}>
                            <ArticleCard article={ele} />
                        </UpdownAnime>
                    ))}
                </Flex>
                <UpdownAnime delay={DELAY(5)}>
                    {articleList && articleList?.length > 0 ? (
                        <Flex className='justify-between'>
                            <Flex className='gap-2 flex-auto justify-center'>
                                <Pagination page={page} setPage={setPage} totalPage={totalPage} />
                                <PageSize count={count} setCount={setCount} />
                            </Flex>
                        </Flex>
                    ) : (
                        <Flex className='flex-auto justify-center items-center h-72'>EMPTY</Flex>
                    )}
                </UpdownAnime>
            </Flex>
        </UpdownAnime>
    )
}

export default ArticleList
