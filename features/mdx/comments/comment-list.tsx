import { CommentProps } from '@entities/comment'
import { EditComment } from '@features/mdx/comments'
import { Avatar, AvatarFallback, AvatarImage } from '@shared/ui/avatar'
import { Badge } from '@shared/ui/badge'
import { CornerDownRight } from 'lucide-react'

interface CommentListProps {
    comments: CommentProps[]
    user: Record<string, any> | null
    post: string
    upper_id?: number
    eleDepth?: number
}

export const CommentsList = async ({ comments, user, post, upper_id, eleDepth }: CommentListProps) => {
    const recursiveComments = (comments: CommentProps[], id?: string | number, depth = 0): CommentProps[] => {
        const targetComments = comments.filter((ele) => ele.upper_id == id)
        return targetComments.map((ele) => ({
            ...ele,
            depth,
            children: recursiveComments(comments, ele.id, depth + 1),
        }))
    }
    return (
        <section className='flex flex-col'>
            {recursiveComments(comments, upper_id || 0, eleDepth || 0).map((ele, idx) => (
                <div key={idx} className='flex flex-col'>
                    <section className='flex w-full items-center justify-start gap-3 py-3' id={ele.id?.toString()}>
                        {ele.depth !== 0 && (
                            <>
                                {Array.from({ length: ele.depth! - 1 }).map((_, idx) => (
                                    <span className='mx-5 font-bold' key={idx}>
                                        |
                                    </span>
                                ))}
                                <CornerDownRight className='mx-3.5' key={idx} />
                            </>
                        )}
                        <Avatar className='w-12 h-12'>
                            <AvatarImage className='m-0 bg-background/15' src={ele.avatar} alt='Avatar' />
                            <AvatarFallback>{ele.username}</AvatarFallback>
                        </Avatar>
                        <section className='flex-1 flex flex-col justify-center px-3'>
                            <section className='flex gap-1 items-center'>
                                <span className='font-extrabold'>{ele.username}</span>
                                {ele.updated_at && (
                                    <Badge variant={'outline'} className='p-1 py-0.5 h-fit border rounded-none'>
                                        Edited
                                    </Badge>
                                )}
                            </section>
                            {ele.deleted ? (
                                <span className='text-foreground/25 font-bold'> This comment has been deleted </span>
                            ) : (
                                <span className='h-8/12'> {ele.context}</span>
                            )}
                            <section className='flex gap-1'>
                                <EditComment comment={ele} user={user} post={post} />
                            </section>
                        </section>
                    </section>
                    {ele.children && <CommentsList comments={comments} user={user} post={post} upper_id={ele.id} eleDepth={(ele.depth || 0) + 1} />}
                </div>
            ))}
        </section>
    )
}
