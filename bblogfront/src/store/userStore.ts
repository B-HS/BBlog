import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import axios from "./axios"

export const useUserStore = defineStore("userInfo", () => {
    const userState = reactive<userInfo>({
        token: undefined, id: undefined, num: undefined, username: undefined
    })
    const rtkn = ref<string|undefined>("")
    
    const headers = reactive<{Authorization?: string, rAuthorization?: string }>({
    })



    const setUserInfo = (token: string, id: string, num: number, username: string, rt:string) => {
        userState.token = token
        userState.id = id
        userState.num = num
        userState.username = username
        rtkn.value = rt
    }

    const getUserInfo = computed<userInfo>(() => {
        return userState
    })

    const logout = () => {
        userState.token = undefined, 
        userState.id = undefined, 
        userState.num = undefined, 
        userState.username = undefined
        rtkn.value = undefined
    }
    const login = async (id: string, pw: string) => {
        return axios.post("/login", { email: id, password: pw }).then((res) => {
            setUserInfo(res.data.token, res.data.email, res.data.memberId, res.data.nickname, res.data.rToken)
            return res.status
        })
    }
    
    const getUserId = computed(() => userState.id)
    const getUserNum = computed(() => userState.num)

    return { setUserInfo, login, logout, getUserInfo, getUserNum, getUserId }
})
