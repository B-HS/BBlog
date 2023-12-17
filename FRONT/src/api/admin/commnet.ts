import { Comment } from '@/components/article/comment'
import axios from 'axios'

export const getAllComments = async (isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.post('/admin/comment/list')
        console.log(data)

        return data
    } catch (error) {
        return error
    }
}

export const deleteCommentAdmin = async (comment: Partial<Comment>) => {
    try {
        const { data } = await axios.post('/admin/comment/delete', comment)
        return data
    } catch (error) {
        return error
    }
}
