import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import axios from 'axios'

export const useUserStore = defineStore("userInfo", () => {
    const userState = reactive<userInfo>({
        token: undefined, id: undefined, num: undefined, username: undefined
    })


    const setUserInfo = (token: string, id: string, num: number, username: string) => {
        userState.token = token
        userState.id = id
        userState.num = num
        userState.username = username
    }
    const getUserInfo = () => {
        return userState
    }

    const logout = () => {
        userState.token = undefined, 
        userState.id = undefined, 
        userState.num = undefined, 
        userState.username = undefined
    }
    const login = async (id: string, pw: string) => {
        return axios.post("/login", { email: id, password: pw }).then((res) => {
            setUserInfo(res.data.token, res.data.email, res.data.memberId, res.data.nickname)
            return res.status
        })
    }


    return { setUserInfo, login, logout, getUserInfo }
})
