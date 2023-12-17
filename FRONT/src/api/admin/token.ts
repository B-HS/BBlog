import axios from 'axios'

export const tokenRegenerate = async (tokens: { atk: string; rtk: string }) => {
    try {
        const { data } = await axios.post('/token/check', tokens)
        return data
    } catch (error) {
        return error
    }
}
