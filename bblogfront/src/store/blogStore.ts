import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import { useUserStore } from "./userStore"
import axios from "./axios"
import PiCookie from "./Cookie/PiCookie"


export const useBlogStore = defineStore("blogInfo", () => {
    const user = useUserStore()
    const state = reactive<{ menu: menuList[], topRecentFiveArticle: Object, visitCount: visitState, latestModifyDate: string }>({
        menu: [],
        topRecentFiveArticle: new Object,
        visitCount: { today: 0, total: 0 },
        latestModifyDate: ""
    })

    const setMenuList = (menuList: menuList[]) => {
        state.menu = menuList;
    }
    const setTopRecentFiveArticle = () => { }
    const setVisitCounter = (today: number, total: number) => {
        state.visitCount.today = today
        state.visitCount.total = total
    }
    const setLatestModifyDate = (date: string) => {
        state.latestModifyDate = date
    }


    const getMenuList = computed<menuList[]>(() => state.menu)
    const getTopRecentFiveArticle = computed(() => state.topRecentFiveArticle)
    const getVisitCounter = computed<visitState>(() => state.visitCount)
    const getLatestModifyDate = computed(() => state.latestModifyDate)

    const articleRequest = (requestedPage: Number, totalPageSize: number) => {
        return axios.post("/article/recent", { requestedPage: requestedPage, totalPageSize: totalPageSize })
    }

    const articleRequestByCategory = (requestedPage: Number, totalPageSize: number, id: String | null) => {
        return axios.post(`/category/${id}`, { requestedPage: requestedPage, totalPageSize: totalPageSize })
    }


    const menuListRequest = async () => {
        axios.get("/menulist").then(res => {
            const result: menuList[] = res.data.map((ele: menuList) => {
                return ele
            })
            setMenuList(JSON.parse(JSON.stringify(result)) as menuList[])
        })
    }

    const replyAddRequest = (aid: number, userName: string, isLogged: boolean, pwd: string, context: string, group: number, sort: number) => {
        let replyInfo = {
            articleid: aid,
            replypwd: "",
            context: context,
            member: { mid: -1, nickname: "" },
            replyGroup: group,
            replySort: sort,
            logged: false
        }
        if (isLogged) {
            replyInfo.member.mid = user.getUserNum as number
            replyInfo.logged = true
            return axios.post("/article/member/reply", replyInfo, { headers: { Authorization: user.getUserInfo.token } })
        } else {
            replyInfo.member.nickname = userName
            replyInfo.replypwd = pwd
            return axios.post("/article/reply", replyInfo)
        }

    }

    const replyRemoveRequest = (rid: number, passwd: string, islogged: boolean, member: { mid: number }) => {
        if (islogged) {
            if (passwd == "tkrwp" || passwd == "ㅅㅏㄱㅈㅔ") {
                return axios.post("/article/member/reply/delete", { rid: rid, logged: true, member }, { headers: { Authorization: user.getUserInfo.token } }).then(res => res.data)
            }
        } else {
            return axios.post("article/reply/delete", { rid: rid, replypwd: passwd, logged: false }).then(res => res.data)
        }

    }


    const replyModifyRequest = (rid: number, passwd: string, islogged: boolean, member: { mid: number }, context: string, group: number, sort: number, articleid: number) => {
        if (islogged) {
            if (passwd == "tnwjd" || passwd == "ㅅㅜㅈㅓㅇ") {
                return axios.post("/article/member/reply/modify", { rid: rid, logged: true, member, context, replyGroup: group, replySort: sort }, { headers: { Authorization: user.getUserInfo.token } }).then(res => res.data)
            }
        } else {
            return axios.patch("/article/reply/modify", { rid: rid, replypwd: passwd, logged: false, context, replyGroup: group, replySort: sort, articleid: articleid }).then(res => res.data)

        }

    }

    const VisitCounterRequest = async () => {
        return axios.post("/visitor/count").then(res => {
            setVisitCounter(res.data.today, res.data.total)
        })
    }

    const StackInfoRequest = () => {
        return axios.get("/stack")
    }



    const stackInfoModifyingRequest = async (dtos: stackset[], deleteList: number[]) => {
        const headers = {
            "Authorization": user.getRtkn
        }
        const body = { dtoList: dtos, deleteList: deleteList }
        return axios.post("/admin/stack", body, { headers })
    }

    const nicknameChangeRequest = async (changedNickname: string, pw: string) => {
        return axios.post("/member/nickname", { changedNickname: changedNickname, mid: user.getUserInfo.num, pw: pw }, { headers: { Authorization: user.getUserInfo.token } })
            .then(res => {
                if (res.status == 200) {
                    user.tokenDateValidateAndReissue(user.getUserInfo.token!, true)
                }
                return true;
            })
    }

    const declarationRequest = (pw: string, repw: string) => {
        if (pw !== repw) {
            return
        } else {
            return axios.post("/member/declaration", { mid: user.getUserInfo.num, pw: pw, repw: repw }, { headers: { Authorization: user.getUserInfo.token } }).then(res => {
                if (res.data == true) {
                    user.setUserInfo("", ",", -1, "", "")
                    PiCookie().rmCookie("a")
                    PiCookie().rmCookie("r")
                    PiCookie().rmCookie("user")
                    return true
                }
            })
        }

    }

    const oauthRestInformationRequest = async (changedNickname: string, pw: string) => {
        return axios.post("/member/restoauthinfo", { changedNickname: changedNickname, pw: pw, mid: user.getUserInfo.num }, { headers: { Authorization: user.getUserInfo.token } })
            .then(res => {
                if (res.data == true) {
                    user.tokenDateValidateAndReissue(user.getUserInfo.token!, true)
                    return true
                } else {
                    return false
                }

            })
    }


    return { getMenuList, getTopRecentFiveArticle, getVisitCounter, getLatestModifyDate, oauthRestInformationRequest, nicknameChangeRequest, declarationRequest, setMenuList, setTopRecentFiveArticle, setVisitCounter, articleRequest, menuListRequest, articleRequestByCategory, replyAddRequest, replyRemoveRequest, VisitCounterRequest, replyModifyRequest, setLatestModifyDate, StackInfoRequest, stackInfoModifyingRequest }
})
