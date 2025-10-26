import { getCategoryList } from '@entities/category'
import { GetPostListParams, getPostList } from '@entities/post'
import { getTagList } from '@entities/tag'
import { ArticleFilter } from '@widgets/post/article-filter'
import { ArticlePaginator } from '@widgets/post/article-paginator'
import { PostList } from '@widgets/post/post-list'
import { XIcon } from 'lucide-react'
import Link from 'next/link'
import { FC, Fragment } from 'react'

interface PostListContentProps {
    searchParams: Promise<GetPostListParams>
}

const DEFAULT_LIMIT = 12

export const PostListContent: FC<PostListContentProps> = async ({ searchParams }) => {
    const categoryList = await getCategoryList()
    const tagList = await getTagList()
    const params = await searchParams
    const currentPage = Math.floor((params.offset || 0) / DEFAULT_LIMIT) + 1
    const { data, total } = await getPostList({ ...params, limit: params.limit ?? DEFAULT_LIMIT })
    const totalPages = Math.ceil(total / DEFAULT_LIMIT)

    const getArticleListTitle = async (params: GetPostListParams) => {
        const titleStack = []
        if (params.categoryId) titleStack.push(categoryList.find((category) => category.categoryId == params.categoryId)?.category ?? 'All')
        if (params.tagId) titleStack.push(tagList.find((tag) => tag.tagId == params.tagId)?.tag ?? 'All')
        if (params.keyword) titleStack.push(params.keyword)
        return titleStack.length > 0 ? (
            <div className='flex items-baseline gap-2'>
                <span>{titleStack.filter(Boolean).join(' & ')}</span>
                <Link href={'/article'} className='flex items-center gap-0.5 text-xs text-secondary-foreground/70 hover:text-secondary-foreground'>
                    <XIcon className='size-3.5' aria-label='검색조건 초기화' />
                    <span>검색조건 초기화</span>
                </Link>
            </div>
        ) : (
            'Articles'
        )
    }

    return (
        <>
            <h2 className='text-2xl font-bold'>{getArticleListTitle(params)}</h2>
            <ArticleFilter categoryList={categoryList} />
            <PostList posts={data} />
            <ArticlePaginator currentPage={currentPage} totalPages={totalPages} />
        </>
    )
}
