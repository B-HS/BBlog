import { ArticleListManagement } from './article'
import { CommentListManagement } from './comment'
import { Dashboard } from './dashboard'

export const RouterComponents = {
    dashboard: () => <Dashboard />,
    article: {
        list: () => <ArticleListManagement />,
    },
    comment: {
        list: () => <CommentListManagement />,
    },
}
