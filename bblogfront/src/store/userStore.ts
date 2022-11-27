import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import axios from "./axios"
import PiCookie from "./Cookie/PiCookie"
import jwtDecode, { type JwtPayload } from "jwt-decode"
import { useRouter } from "vue-router"
import Cookies from "js-cookie"
export const useUserStore = defineStore("userInfo", () => {
    const userState = reactive<userInfo>({
        token: undefined, id: undefined, num: undefined, username: undefined, admin: false
    })
    const rtkn = ref<string | undefined>("")
    const router = useRouter()

    const memberDropdown = reactive<dropdown>({
        img: "",
        name: "",
        replyCount: 0
    })

    const replyModalList = reactive<modalReply[]>([])

    const setReplyModalList = (response:modalReply[]) => {
        response.forEach(res=>{
            replyModalList.push({ articleid: res.articleid, context: res.context, regdate: res.regdate })
        })
    }
    const getReplyModalList = computed<modalReply[]>(() => replyModalList)

    const setMemberDropdown = (pic: string, nickname: string, cnt: number) => {
        memberDropdown.img = pic
        memberDropdown.name = nickname
        memberDropdown.replyCount = cnt
    }

    const getMemberDropdown = computed<dropdown>(() => memberDropdown)


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
        if (userState.token) {
            tokenValidate(userState.token)
        }
        return userState
    })
    const getUserInfoWithoutTkn = computed(() => {
        return { id: userState.id, num: userState.num, username: userState.username }
    })

    const logout = () => {
        axios.post("/logout", {}, { headers: { Authorization: rtkn.value } })
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
    const login = async (id: string, pw: string) => {
        return axios
            .post("/login", { email: id, password: pw })
            .then((res) => {
                if (res.status == 200) {
                    setUserInfo(res.data.token, res.data.email, res.data.memberId, res.data.nickname, res.data.rToken)
                    axios.post("/admin", {}, { headers: { Authorization: res.data.rToken } }).then(res => {
                        setAdmin(res.data);
                    })
                    return true
                } else {
                    return false
                }
            }).catch(e => {
                e

            })
    }

    const join = (nickname: string, email: string, password: string) => {
        return axios.post("/register", { nickname: nickname, email: email, password: password })
    }

    const setTkn = (a: string, t: string) => {
        userState.token = a
        rtkn.value = t
    }

    const getUserId = computed(() => userState.id)
    const getUserNum = computed(() => userState.num)
    const getHeaders = computed(() => {
        if (userState.token) { tokenValidate(userState.token) }
        return userState.token
    })
    const getIsAdmin = computed(() => userState.admin)
    const getRtkn = computed(() => {
        const { exp } = jwtDecode<JwtPayload>(rtkn.value as string)
        const now = new Date().getTime() / 1000
        if (exp && now >= exp) {
            router.push("/login")
        } else {
            return rtkn.value
        }
    });

    const tokenDateValidateAndReissue = async (token: string, force?: boolean) => {
        if (!token) {
            return false
        }
        let needRefresh: boolean = false
        const { exp } = jwtDecode<JwtPayload>(token)
        const now = new Date().getTime() / 1000
        exp && exp - now >= 180 ? needRefresh = false : needRefresh = true
        if (force) {
            needRefresh = true
        }
        if (needRefresh) {
            return axios
                .post("/token/refreshing", {}, { headers: { "mixedAuth": getUserInfo.value.token + "hsxhzmsdlqslek" + getRtkn.value } })
                .then(res => {
                    if (res.data.atoken) {
                        setUserInfo(res.data.atoken, userState.id!, userState.num!, res.data.nickname, res.data.rtoken)
                        PiCookie("127.0.0.1", 1, false, 'strict').setCookie("a", getUserInfo.value.token!)
                        PiCookie("127.0.0.1", 1, false, 'strict').setCookie("r", getRtkn.value!)
                        PiCookie("127.0.0.1", 1, false, 'strict').setCookie("user", JSON.stringify(getUserInfoWithoutTkn.value))
                        return true
                    } else {
                        userState.token = undefined,
                            userState.id = undefined,
                            userState.num = undefined,
                            userState.username = undefined
                        userState.admin = false
                        rtkn.value = undefined
                        return false
                    }
                })
        } else {
            return true
        }
    }

    const tokenValidate = (token: string) => {
        if (token) {
            tokenDateValidateAndReissue(token).then(res => {
                if (res == false) { router.push("/login") }
            })
        }
    }

    const emailDupeCheck = (email: string) => {
        return axios.post("/emaildupcheck", { email: email })
    }

    const isOauth = async () => {
        return axios.post("/member/isoauth", { mid: JSON.parse(Cookies.get("user") as string).num })
    }


    const getDropboxInfo = async (token?: string) => {
        if (token) {
            tokenValidate(token)
        }
        getReplyListByMid()
        return axios.post("/member/dropdown", { mid: getUserNum.value }, { headers: { "Authorization": getHeaders.value } }).then(res => { setMemberDropdown(res.data.picture, res.data.nickname, res.data.replyCount) })
    }


    const getReplyListByMid = () => {
        axios.post("/article/replylist", { mid: getUserNum.value }).then(res => {
            replyModalList.splice(0)
            setReplyModalList(res.data);
        })
    }

    return { setUserInfo, setTkn, login, logout, join, tokenDateValidateAndReissue, getReplyListByMid, emailDupeCheck, isOauth, setMemberDropdown, getDropboxInfo, getReplyModalList, setReplyModalList, getMemberDropdown, getUserInfo, getUserNum, getUserId, getHeaders, getIsAdmin, getRtkn, getUserInfoWithoutTkn }
})
