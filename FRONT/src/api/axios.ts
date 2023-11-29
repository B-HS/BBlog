import axios from 'axios'

const axs = axios
const instance = axs.create({
    baseURL: process.env.NEXT_PUBLIC_BACK,
    headers: {
        'Content-Type': 'application/json',
    },
})

instance.interceptors.request.use(
    (config) => {
        // 앱 로딩 시작 추가
        return config
    },
    (error) => {
        // 앱 로딩 종료 추가
        return Promise.reject(error)
    },
)

instance.interceptors.response.use(
    (response) => {
        // 앱 로딩 종료 추가
        return response
    },
    (error) => {
        // 앱 로딩 종료 추가
        return Promise.reject(error)
    },
)

export { instance as axios }
