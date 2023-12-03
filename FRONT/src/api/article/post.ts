import axios from 'axios'

export const getPostById = async (id: number | string, isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get('/article/' + id)
        return data
    } catch (error) {
        return error
    }
}

export const getAllPost = async (isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get('/article/list')
        return data
    } catch (error) {
        return error
    }
}
