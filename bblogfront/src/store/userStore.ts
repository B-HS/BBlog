import { defineStore } from "pinia"
import { computed, ref } from "vue"
import axios from 'axios'

export const useUserStore = defineStore("userInfo", ()=>{
    const userToken = ref<string>()
    const userId = ref<string>()
    const userNum = ref<number>()


    const setUserInfo = (token: string, id: string, num: number)=>{
        userToken.value = token
        userId.value = id
        userNum.value = num
    }
    
    const logout = ()=>{
        userToken.value = undefined
        userId.value = undefined
        userNum.value = undefined
    }
    const login = (id:string, pw:string)=>{
        axios.post("apiAdress", {id:id, pw:pw}).then((res)=>{
            userToken.value = res.data.userToken
            userId.value = res.data.id
            userNum.value = res.data.num
        })
    }

    const getUserId = computed(()=> userId.value)
    const getUserNum = computed(()=> userNum.value)
    

    return { userToken, setUserInfo, getUserId, getUserNum}
})
