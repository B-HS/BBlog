import { axios } from '../axios'

export const userLogin = async (email: string, pw: string) => {
    const { data } = await axios.post('/login', { email, pw })
    return data
}
