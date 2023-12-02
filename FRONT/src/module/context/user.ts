import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import { Dispatch, SetStateAction, createContext } from 'react'

export interface UserData {
    userdata: {
        urkey: number
        email: string
        urname: string
        nickname: string
        introduce: string
        img: string
        lastLogin: null | Date
        roles: string[]
        atk: string
        rtk: string
    }
    setUser: Dispatch<SetStateAction<UserData['userdata']>>
}

const DEFAULT_USER_DATA = {
    urkey: -1,
    email: '',
    urname: '',
    nickname: '',
    introduce: '',
    lastLogin: null,
    roles: [],
    img: '',
    atk: '',
    rtk: '',
}

const UserContext = createContext<UserData>({
    userdata: DEFAULT_USER_DATA,
    setUser: () => {},
})

const getInitialUserData = () => {
    const isLogout = getCookie('logout')
    const userInfo = getCookie('userInfo')
    const atk = getCookie('atk')
    const rtk = getCookie('rtk')

    if (isLogout) {
        Array.of('atk', 'rtk', 'userInfo', 'logout').forEach((info) => deleteCookie(info))
        return DEFAULT_USER_DATA
    }

    if (userInfo && atk && rtk) {
        return { ...JSON.parse(userInfo), atk, rtk }
    }

    return DEFAULT_USER_DATA
}

const UserLogout = () => {
    setCookie('logout', true)
    window.location.reload()
}

export { DEFAULT_USER_DATA, UserContext, UserLogout, getInitialUserData }
