import { getFileInfo } from '@/lib/files'
import dayjs from 'dayjs'

const sitemap = async () => {
    const rawPosts = await getFileInfo(true)
    const posts = rawPosts.map((post) => ({
        url: `https://blog.gumyo.net/article/${post.file.replace('.mdx', '')}`,
        lastModified: dayjs(post.date).toISOString() ,
    }))

    return [...posts]
}
export default sitemap
