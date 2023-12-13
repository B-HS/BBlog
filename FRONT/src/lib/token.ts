import { getCookie } from 'cookies-next'

interface TOKEN {
    iss: string
    exp: number
    iat: number
    urkey: number
    email: string
}

const isTokenExpired = (token: TOKEN) => {
    return Date.now() >= token.exp * 1000
}

const tokenCheck = () => {
    const rawAtk = getCookie('atk')
    const rawRtk = getCookie('rtk')
    if (rawAtk && rawRtk) {
        const atk = JSON.parse(window.atob(rawAtk.split('.')[1]))
        const rtk = JSON.parse(window.atob(rawRtk.split('.')[1]))
        if (atk && rtk && !isTokenExpired(atk) && !isTokenExpired(rtk)) {
            return true
        }
    }
    return false
}

export { isTokenExpired, tokenCheck }
