import axios from 'axios'

export const userLogin = async (email: string, pw: string) => {
    try {
        const { data } = await axios.post('/login', { email, pw })
        return data
    } catch (error) {
        return error
    }
}

export const adminProfile = async (isServerside?: boolean) => {
    try {
        if (isServerside) axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK
        const { data } = await axios.get('/user/1')
        return data
    } catch (error) {
        return error
    }
}
