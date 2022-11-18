import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import { useUserStore } from "./userStore"
import axios from 'axios'


export const useBlogStore = defineStore("blogInfo", () => {
    const user = useUserStore()
    const state = reactive<{ menu: menuList[], topRecentFiveArticle: Object, counter: number[] }>({
        menu: [],
        topRecentFiveArticle: new Object,
        counter: []
    })

    const setMenuList = (menuList: menuList[]) => {
        state.menu = menuList;
    }
    const setTopRecentFiveArticle = () => { }
    const setCounter = () => { }


    const getMenuList = computed<menuList[]>(() => state.menu)
    const getTopRecentFiveArticle = computed(() => state.topRecentFiveArticle)
    const getCounter = computed(() => state.counter)

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

    const replyRemoveRequest = (rid: number, passwd: string, islogged: boolean, member:{mid:number}) => {
        if (islogged) {
            if (passwd == "삭제") {
                return axios.post("article/reply/delete", { rid: rid, logged:true, member }).then(res => res.data)
                //  member usernum은 나중에 백엔드에서 토큰검사도 같이 
            }
        } else {
            console.log(rid + "asdf" + passwd + "asdfasdf" + islogged);
            return axios.post("article/reply/delete", { rid: rid, replypwd: passwd, logged:false }).then(res => res.data)
            
        }

    }


    return { getMenuList, getTopRecentFiveArticle, getCounter, setMenuList, setTopRecentFiveArticle, setCounter, articleRequest, menuListRequest, articleRequestByCategory, replyAddRequest, replyRemoveRequest }
})
