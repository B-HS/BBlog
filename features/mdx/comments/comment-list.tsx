import { CommentProps } from '@entities/comment'

interface CommentListProps {
    comments: CommentProps[]
}

export const CommentsList = async ({ comments }: CommentListProps) => {
    return <section>COMMENT</section>
}
