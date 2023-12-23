import { Article } from '@/components/article/articleContext'
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

export const getListByMenuName = async (menuName: string, page: number, count: number, isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get(`/article/list/${menuName}/${page}/${count}`)
        return data
    } catch (error) {
        return error
    }
}

export const getAllPost = async (isServerside?: boolean, onlyCount?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get('/article/list')
        if (onlyCount) {
            return data.reduce((prev: { [x: string]: number }, next: { mekey: string | number }) => {
                prev[`ME_${next.mekey}`] = (prev[`ME_${next.mekey}`] || 0) + 1
                return prev
            }, {})
        }
        return data
    } catch (error) {
        return error
    }
}

export const getAllpostByKeyword = async (keyword: string, isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get('/article/search/' + keyword)
        return data
    } catch (error) {
        return error
    }
}

export const getArticleByMenuName = async (menuname: string, isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get(`/article/doc/${menuname}`)
        return data
    } catch (error) {
        return error
    }
}

export const savePost = async (article: Partial<Article>) => {
    try {
        const { data } = await axios.post('/article/save', article)
        return data
    } catch (error) {
        return error
    }
}
