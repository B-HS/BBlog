import ArticleList from '@/components/article/articlelist'

export const generateMetadata = async ({ params: { category } }: { params: { aid: string; category: string } }) => {
    return {
        title: `${category.toUpperCase()} Articles | BBlog`,
        description: `${category.toUpperCase()} Articles | BBlog`,
        keywords: [category.toUpperCase(), category],
        openGraph: {
            title: `${category.toUpperCase()} Articles | BBlog`,
            description: `${category.toUpperCase()} Articles | BBlog`,
        },
        twitter: {
            title: `${category.toUpperCase()} Articles | BBlog`,
            description: `${category.toUpperCase()} Articles | BBlog`,
        },
        robots: {
            index: true,
            follow: true,
        },
        canonical: `https://hyns.dev/${category}`,
        authors: { name: 'Hyunoseok Byun', url: 'https://hyns.dev' },
        icons: { icon: '/favicon.ico' },
    }
}

const ArticleListPage = ({ params: { category } }: { params: { category: string } }) => {
    return <ArticleList category={category} />
}

export default ArticleListPage
