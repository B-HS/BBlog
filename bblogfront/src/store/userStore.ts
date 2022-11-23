import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import axios from "./axios"
import PiCookie from "./Cookie/PiCookie"
export const useUserStore = defineStore("userInfo", () => {
    const userState = reactive<userInfo>({
        token: undefined, id: undefined, num: undefined, username: undefined, admin: false
    })
    const rtkn = ref<string | undefined>("")



    const setUserInfo = (token: string, id: string, num: number, username: string, rt: string) => {
        userState.token = token
        userState.id = id
        userState.num = num
        userState.username = username
        rtkn.value = rt
    }

    const setAdmin = (checker: boolean) => {
        userState.admin = checker
    }

    const getUserInfo = computed<userInfo>(() => {        
        return userState
    })
    const getUserInfoWithoutTkn = computed(()=>{
        return {id:userState.id, num:userState.num, username:userState.username}
    })

    const logout = () => {
        axios.post("/logout", {}, {headers:{Authorization: rtkn.value}})
        userState.token = undefined,
        userState.id = undefined,
        userState.num = undefined,
        userState.username = undefined
        userState.admin = false
        rtkn.value = undefined
        PiCookie().rmCookie("a")
		PiCookie().rmCookie("r")
		PiCookie().rmCookie("user")
    }
    const login = async(id: string, pw: string) => {
        return axios.post("/login", { email: id, password: pw }).then(async (res) => {
            setUserInfo(res.data.token, res.data.email, res.data.memberId, res.data.nickname, res.data.rToken)
            axios.post("/admin", {}, { headers:{Authorization: res.data.rToken} }).then(res => { 
                setAdmin(res.data); return res.status 
            })
            return res.status
        })
    }

    const setTkn = (a:string, t:string)=>{
        userState.token = a
        rtkn.value = t
    }

    const getUserId = computed(() => userState.id)
    const getUserNum = computed(() => userState.num)
    const getHeaders = computed(() => userState.token)
    const getIsAdmin = computed(()=> userState.admin)
    const getRtkn = computed(()=> {
        return rtkn.value});

    return { setUserInfo, setTkn, login, logout, getUserInfo, getUserNum, getUserId, getHeaders, getIsAdmin, getRtkn, getUserInfoWithoutTkn }
})
