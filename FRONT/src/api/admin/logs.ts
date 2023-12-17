import axios from 'axios'

export const getLogs = async () => {
    try {
        const { data } = await axios.post('/admin/log/list')
        console.log(data)

        return data
    } catch (error) {
        return error
    }
}
