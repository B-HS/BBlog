'use client'

import { useGetCommentList } from '@entities/comment.client'
import { CommentForm } from './comment-form'
import { CommentList } from './comment-list'
import { FC, useEffect, useRef, useState } from 'react'
import { MessageSquare } from 'lucide-react'

interface CommentSectionProps {
    postId: number
}

export const CommentSection: FC<CommentSectionProps> = ({ postId }) => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    const { data: comments, isLoading } = useGetCommentList(postId, isVisible)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 },
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [isVisible])

    return (
        <section ref={sectionRef}>
            <div className='p-3.5 flex items-center gap-2 border-b border-border'>
                <MessageSquare className='size-5' />
                <p className='text-lg font-semibold'>댓글 {comments && Array.isArray(comments) ? `(${comments.length})` : ''}</p>
            </div>
            <CommentForm postId={postId} />
            {isLoading ? (
                <div className='p-8 text-center text-sm text-muted-foreground'>댓글을 불러오는 중...</div>
            ) : (
                <CommentList comments={comments ?? []} postId={postId} />
            )}
        </section>
    )
}
