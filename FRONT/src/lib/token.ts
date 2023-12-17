import { tokenRegenerate } from '@/api/admin/token'
import { getCookie, setCookie } from 'cookies-next'

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

const tokenCheckAndRegen = async (tokens: { atk: string; rtk: string }) => {
    const { atk, rtk } = await tokenRegenerate(tokens)
    if (!atk || !rtk) {
        return false
    }

    setCookie('atk', atk)
    setCookie('rtk', rtk)
    return true
}

const tokenCheck = () => {
    const rawAtk = getCookie('atk')
    const rawRtk = getCookie('rtk')
    if (rawAtk && rawRtk) {
        const atk = JSON.parse(window.atob(rawAtk.split('.')[1]))
        const rtk = JSON.parse(window.atob(rawRtk.split('.')[1]))
        if (atk && rtk && isTokenExpired(atk) && !isTokenExpired(rtk)) {
            return tokenCheckAndRegen({ atk: rawAtk, rtk: rawRtk })
        }

        if (atk && rtk && !isTokenExpired(atk) && !isTokenExpired(rtk)) {
            return true
        }
    }
    return false
}

export { isTokenExpired, tokenCheck }
