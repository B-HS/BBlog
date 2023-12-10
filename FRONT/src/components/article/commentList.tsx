'use client'
import { getCommentByAid } from '@/api/article/comment'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Flex from '../flex'
import UpdownAnime from '../transition/updown'
import CommentCard, { Comment } from './comment'
import CommentRegisterInput from './commentRegisterInput'

const CommentList = () => {
    const [commentList, setCommentList] = useState<Comment[]>([])
    const { aid } = useParams()
    const getComment = async () => {
        const commentList = await getCommentByAid(Number(aid))
        setCommentList(() => commentList)
    }
    const reloadComment = () => {
        getComment()
    }

    useEffect(() => {
        const getComment = async () => {
            const commentList = await getCommentByAid(Number(aid))
            setCommentList(() => commentList)
        }
        getComment()
    }, [aid])

    const createCommentHierarchy = (comments: Comment[], uppercid: number = 0, level = 0): Comment[] => {
        if (!Array.isArray(comments)) return []
        const filteredItems = comments.filter((item) => item.uppercid === uppercid).sort((a, b) => a.commentorder - b.commentorder)
        return filteredItems.map((item: Comment) => ({
            aid: item.aid,
            cid: item.cid,
            nickname: item.nickname,
            commentorder: item.commentorder,
            img: item.img,
            context: item.context,
            uppercid: item.uppercid,
            insertdate: item.insertdate,
            level,
            deleted: item.deleted,
            modified: item.modified,
            password: item.password,
            children: createCommentHierarchy(comments, item.cid, level + 1),
        }))
    }
    const generateHierarchyComponent = (comments: Comment[]): JSX.Element[] => {
        return comments.map((item) => (
            <UpdownAnime key={item.cid}>
                <CommentCard key={item.cid} data={item} reloadComment={reloadComment} />
                {item.children && generateHierarchyComponent(item.children)}
            </UpdownAnime>
        ))
    }

    return (
        <Flex className='flex-col gap-5'>
            <header className='flex gap-1 items-baseline mb-5'>
                <p className='text-2xl'>Comment</p>
                <p className='text-xs opacity-50'>{commentList.length} comments</p>
            </header>
            <CommentRegisterInput reloadComment={reloadComment} />
            <Flex className='flex-col gap-10'>{generateHierarchyComponent(createCommentHierarchy(commentList))}</Flex>
        </Flex>
    )
}

export default CommentList
