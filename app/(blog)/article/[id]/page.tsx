import { ScrollbarToc } from '@widgets/layout/scrollbar-toc'
import { Post } from './_contents/post-content'
import { Fragment, Suspense } from 'react'

const ArticleDetailPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    return (
        <Fragment>
            <Suspense>
                <Post params={params} />
            </Suspense>
            <ScrollbarToc />
        </Fragment>
    )
}

export default ArticleDetailPage
