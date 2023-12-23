import axios from 'axios'

export const getLogs = async () => {
    try {
        const { data } = await axios.post('/admin/log/list')
        return data
    } catch (error) {
        return error
    }
}

export const getFullLogs = async () => {
    try {
        const { data } = await axios.post('/admin/dashboard/all')
        console.log(data)
        return data
    } catch (error) {
        return error
    }
}
