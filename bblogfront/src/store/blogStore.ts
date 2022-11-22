import { defineStore } from "pinia"
import { computed, reactive, ref } from "vue"
import axios from "./axios"
import { useUserStore } from "./userStore"


export const useBlogStore = defineStore("blogInfo", () => {
    const user = useUserStore()
    const state = reactive<{ menu: menuList[], topRecentFiveArticle: Object, visitCount: visitState, latestModifyDate:string }>({
        menu: [],
        topRecentFiveArticle: new Object,
        visitCount: {today:0, total:0},
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
    const setLatestModifyDate = (date:string) =>{
        state.latestModifyDate = date
    }


    const getMenuList = computed<menuList[]>(() => state.menu)
    const getTopRecentFiveArticle = computed(() => state.topRecentFiveArticle)
    const getVisitCounter = computed<visitState>(() => state.visitCount)
    const getLatestModifyDate = computed(()=>state.latestModifyDate)

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
        } else {
            replyInfo.member.nickname = userName
            replyInfo.replypwd = pwd
        }


        return axios.post("/article/reply", replyInfo)
    }

    const replyRemoveRequest = (rid: number, passwd: string, islogged: boolean, member: { mid: number }) => {
        if (islogged) {
            if (passwd == "삭제") {
                return axios.post("/article/reply/delete", { rid: rid, logged: true, member }).then(res => res.data)
                //  member usernum은 나중에 백엔드에서 토큰검사도 같이 
            }
        } else {
            return axios.post("article/reply/delete", { rid: rid, replypwd: passwd, logged: false }).then(res => res.data)
        }

    }


    const replyModifyRequest = (rid: number, passwd: string, islogged: boolean, member: { mid: number }, context:string, group:number, sort:number, articleid:number) => {
        if (islogged) {
            if (passwd == "수정") {
                return axios.patch("/article/reply", { rid: rid, logged: true, member, context,replyGroup:group, replySort:sort }).then(res => res.data)
                //  member usernum은 나중에 백엔드에서 토큰검사도 같이 
            }
        } else {
            return axios.patch("/article/reply", { rid: rid, replypwd: passwd, logged: false, context, replyGroup:group, replySort:sort, articleid:articleid}).then(res => res.data)
            
        }

    }

    const VisitCounterRequest = async ()=>{
        return axios.post("/visitor/count").then(res=>{
            setVisitCounter(res.data.today, res.data.total)
        })
    }

    const StackInfoRequest = () =>{
        return axios.get("/stack")
    }

    const stackInfoModifyingRequest = (dtos:stackset[], deleteList:number[]) =>{
        return axios.post("/admin/stack", {dtoList:dtos, deleteList:deleteList})
    }
    return { getMenuList, getTopRecentFiveArticle, getVisitCounter, getLatestModifyDate, setMenuList, setTopRecentFiveArticle, setVisitCounter, articleRequest, menuListRequest, articleRequestByCategory, replyAddRequest, replyRemoveRequest, VisitCounterRequest, replyModifyRequest, setLatestModifyDate, StackInfoRequest, stackInfoModifyingRequest }
})
