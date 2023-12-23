'use client'
import { deleteComment, updateComment } from '@/api/article/comment'
import dayjs from 'dayjs'
import DOMPurify from 'isomorphic-dompurify'
import { CheckIcon, MessageSquareIcon, PenIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import Flex from '../flex'
import DeleteComment from '../modal/commentDeleteModal'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { useToast } from '../ui/use-toast'
import CommentRegisterInput from './commentRegisterInput'

export interface Comment {
    cid: number
    aid: number
    nickname: string
    img: string
    context: string
    commentorder: number
    uppercid: number
    insertdate: null | string | number
    children?: Comment[]
    password?: string
    deleted?: boolean
    modified?: boolean
    level: number
}

const Comment = ({ data, reloadComment }: { data: Comment; reloadComment?: Function }) => {
    const [isReply, setIsReply] = useState(false)
    const [isModifyMode, setIsModifyMode] = useState(false)
    const [modifiedContext, setModifiedContext] = useState('')
    const [pw, setPw] = useState('')
    const { toast } = useToast()

    const setModifyMode = () => {
        setIsModifyMode(true)
        setModifiedContext(DOMPurify.sanitize(data.context || ''))
    }

    const passwordFailToast = () =>
        toast({
            title: 'Wrong Password',
            description: 'Please enter the correct password.',
            variant: 'destructive',
        })

    const modifyComment = async () => {
        const comment = await updateComment({ ...data, context: modifiedContext, password: pw })
        if (comment === data.cid) {
            reloadComment && reloadComment()
            setModifiedContext('')
            setPw('')
            setIsModifyMode(false)
        } else {
            passwordFailToast()
        }
    }

    const removeComment = async (pw: string, closeModal: Function) => {
        const comment = await deleteComment({ ...data, password: pw })
        if (comment === data.cid) {
            reloadComment && reloadComment()
            closeModal()
        } else {
            passwordFailToast()
        }
    }

    return (
        <Flex className='flex-col border dark:shadow-neutral-900' style={{ marginLeft: `${data.level * 50}px`, marginTop: '0.25rem' }}>
            <Flex className='gap-2 items-center'>
                <Avatar className='border'>
                    <AvatarImage
                        className={!data.img ? 'bg-white p-1.5' : ''}
                        src={data.img ? `https://img.gumyo.net/${data.img}` : '/favicon.ico'}
                        alt='usericon'
                    />
                    <AvatarFallback>{data.nickname.split(' ').length === 1 ? data.nickname.slice(0, 2) : data.nickname}</AvatarFallback>
                </Avatar>
                <Flex className='gap-2 items-baseline -translate-y-0.5'>
                    <span className='text-lg font-bold'>{data.nickname}</span>
                    <span className='text-sm opacity-50'>{dayjs(data.insertdate, { format: 'YYYYMMDDHHmmss' }).format('YYYY. MM. DD. HH:mm')}</span>
                </Flex>
            </Flex>
            {isModifyMode ? (
                <Flex className='items-center gap-3 p-3.5 flex-wrap'>
                    <form className='w-2/12'>
                        <Input
                            className='text-center'
                            type='password'
                            autoComplete='off'
                            placeholder='Password'
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
                        />
                    </form>
                    <Input className='w-4/5' value={modifiedContext} onChange={(e) => setModifiedContext(e.target.value)} />
                </Flex>
            ) : (
                <section className='px-3.5 py-2'>
                    {data.deleted ? <p className='opacity-50'>삭제된 댓글입니다.</p> : <p>{DOMPurify.sanitize(data.context || '')}</p>}
                </section>
            )}

            <Flex className='p-1.5 gap-1'>
                {!isModifyMode && !data.deleted && (
                    <>
                        <DeleteComment removeFn={removeComment}>
                            <Button className='shrink-0 p-3' size={'icon'} variant={'ghost'}>
                                <XIcon />
                            </Button>
                        </DeleteComment>
                        <Button className='shrink-0 p-3' size={'icon'} variant={'ghost'} onClick={setModifyMode}>
                            <PenIcon />
                        </Button>
                        <Button className='shrink-0 p-3' size={'icon'} variant={'ghost'} onClick={() => setIsReply(!isReply)}>
                            <MessageSquareIcon />
                        </Button>
                    </>
                )}
                {isModifyMode && (
                    <Flex>
                        <Button className='shrink-0 p-3' size={'icon'} variant={'ghost'} onClick={modifyComment}>
                            <CheckIcon />
                        </Button>
                        <Button className='shrink-0 p-3' size={'icon'} variant={'ghost'} onClick={() => setIsModifyMode(false)}>
                            <XIcon />
                        </Button>
                    </Flex>
                )}
                {isReply && (
                    <CommentRegisterInput
                        data={data}
                        reloadComment={() => {
                            reloadComment && reloadComment()
                            setIsReply(false)
                        }}
                    />
                )}
            </Flex>
        </Flex>
    )
}

export default Comment
