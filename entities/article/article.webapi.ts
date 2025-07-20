import { ResponseArticleList } from './article.types'

export const fetchPostData = async (params: { post: string | number }) => {
    try {
        const { post } = params
        const response = await fetch(`${process.env.SITE_URL}/api/article/${post}`, {
            next: { revalidate: false, tags: ['article', String(post)] },
        })
        if (!String(response.status).startsWith('2')) {
            throw new Error('Failed to fetch data')
        }
        return response.json()
    } catch (error) {
        console.error('Error fetching post data:', error)
        return null
    }
}

export const fetchAllArticles = async () => {
    try {
        const { posts, categories } = await fetch(`${process.env.SITE_URL}/api/article`, {
            method: 'GET',
            next: { revalidate: false, tags: ['articlelist'] },
        }).then((res) => res.json() as ResponseArticleList)

        return {
            posts,
            categories,
        }
    } catch (error) {
        console.error('Error fetching all articles:', error)
        return {
            posts: [],
            categories: [],
        }
    }
}
