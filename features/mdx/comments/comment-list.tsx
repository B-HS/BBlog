import { DisplayingCommentType } from '@entities/comment'
import { Card, CardContent } from '@shared/ui/card'
import dayjs from 'dayjs'
import { Clock } from 'lucide-react'

interface CommentListProps {
    comments: DisplayingCommentType[]
}

export const CommentsList = ({ comments }: CommentListProps) => {
    return (
        <section className='space-y-3 w-full'>
            {comments.map((comment) => (
                <Card key={comment.commentId} id={`comment${comment.commentId.toString()}`}>
                    <CardContent className='p-3'>
                        <section className='flex justify-between items-center'>
                            <span className='text-sm font-semibold'>{comment.nickname}</span>
                            <section className='flex items-center text-xs text-muted-foreground text-nowrap gap-0.5'>
                                <Clock className='size-3 pt-px' />
                                {dayjs(comment.createdAt).format('YYYY-MM-DD')}
                            </section>
                        </section>
                        <span className='text-sm'>{comment.comment}</span>
                    </CardContent>
                </Card>
            ))}
        </section>
    )
}
