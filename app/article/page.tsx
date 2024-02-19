import Fallback from '@/components/fall-back'
import PostList from '@/components/post/post-list'
import { getFileInfo } from '@/lib/files'
import { Suspense } from 'react'

const ListPage = async () => {
    const posts = await getFileInfo(true)

    return (
        <Suspense fallback={<Fallback />}>
            <PostList which='menu' posts={posts} key='menu' />
        </Suspense>
    )
}
export default ListPage
