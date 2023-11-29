import { axios } from '../axios'

export const userLogin = async (email: string, pw: string) => {
    try {
        const { data } = await axios.post('/login', { email, pw })
        return data
    } catch (error) {
        return error
    }
}
