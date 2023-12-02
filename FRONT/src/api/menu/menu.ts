import axios from 'axios'

export const loadMenu = async () => {
    try {
        const { data } = await axios.post('/menu/list')
        return data
    } catch (error) {
        return error
    }
}
