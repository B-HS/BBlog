import axios from 'axios'

export const testingadmin = async () => {
    try {
        return await axios.post('/admin/test').then((res) => console.log(res))
    } catch (error) {
        console.log(error)
    }
}
