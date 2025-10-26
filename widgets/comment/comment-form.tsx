'use client'

import { useCreateComment } from '@entities/comment.client'
import { authClient } from '@lib/auth/auth-client'
import { Button } from '@ui/button'
import { Textarea } from '@ui/textarea'
import { Checkbox } from '@ui/checkbox'
import { Github } from '@ui/icons/github'
import { User } from 'better-auth'
import { FC, useState, useEffect } from 'react'

interface CommentFormProps {
    postId: number
}

export const CommentForm: FC<CommentFormProps> = ({ postId }) => {
    const [comment, setComment] = useState('')
    const [isHide, setIsHide] = useState(false)
    const [user, setUser] = useState<User>()
    const { mutate: createComment, isPending } = useCreateComment()

    useEffect(() => {
        authClient.getSession().then((session) => {
            setUser(session.data?.user)
        })
    }, [])

    const handleSubmit = () => {
        if (!comment.trim()) return
        createComment(
            { postId, comment, isHide },
            {
                onSuccess: () => {
                    setComment('')
                    setIsHide(false)
                },
            },
        )
    }

    const handleGithubLogin = () => {
        authClient.signIn.social({
            provider: 'github',
            callbackURL: window.location.href,
        })
    }

    if (!user) {
        return (
            <div className='p-3.5 flex items-center justify-start gap-3 border-b border-border'>
                <span className='text-sm text-muted-foreground'>댓글을 작성하려면 로그인이 필요합니다.</span>
                <Button onClick={handleGithubLogin} size='sm' variant='outline' className='gap-2 flex-shrink-0'>
                    <Github className='size-4' />
                    GitHub 로그인
                </Button>
            </div>
        )
    }

    return (
        <div className='p-3.5 flex flex-col gap-2 border-b border-border'>
            <Textarea
                placeholder='댓글을 입력하세요'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className='min-h-20 resize-none'
                disabled={isPending}
            />
            <div className='flex items-center justify-between'>
                <label className='flex items-center gap-2 text-sm cursor-pointer'>
                    <Checkbox checked={isHide} onCheckedChange={(checked: boolean) => setIsHide(checked === true)} disabled={isPending} />
                    <span className='text-muted-foreground'>비밀글</span>
                </label>
                <Button onClick={handleSubmit} disabled={isPending || !comment.trim()} size='sm'>
                    {isPending ? '작성 중...' : '댓글 작성'}
                </Button>
            </div>
        </div>
    )
}
