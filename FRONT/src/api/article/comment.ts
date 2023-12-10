import { Comment } from '@/components/article/comment'
import axios from 'axios'

export const getCommentByAid = async (aid: string | number, isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get('/comment/list/' + aid)
        return data
    } catch (error) {
        return error
    }
}

export const saveComment = async (comment: Partial<Comment>) => {
    try {
        const { data } = await axios.post('/comment/save', comment)
        return data
    } catch (error) {
        return error
    }
}

export const deleteComment = async (comment: Partial<Comment>) => {
    try {
        const { data } = await axios.post('/comment/remove', comment)
        return data
    } catch (error) {
        return error
    }
}

export const updateComment = async (comment: Partial<Comment>) => {
    try {
        const { data } = await axios.post('/comment/modify', comment)
        return data
    } catch (error) {
        return error
    }
}
