import { GetPostListParams } from '@entities/post'
import { PostListContent } from './_contents/article-list-content'
import { FC, Suspense } from 'react'

interface ArticleListProps {
    searchParams: Promise<GetPostListParams>
}

const ArticleListPage: FC<ArticleListProps> = ({ searchParams }) => {
    return (
        <div className='px-2 lg:px-0 flex flex-col gap-2 py-7'>
            <Suspense>
                <PostListContent searchParams={searchParams} />
            </Suspense>
        </div>
    )
}

export default ArticleListPage
