import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import axios from 'axios'


export const useBlogStore = defineStore("blogInfo", () => {
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
        await axios.get("/menulist").then(res => {
            const result: menuList[] = res.data.map((ele: menuList) => {
                return ele
            })
            setMenuList(JSON.parse(JSON.stringify(result)) as menuList[])
        })
        return state.menu
    }


    return { getMenuList, getTopRecentFiveArticle, getCounter, setMenuList, setTopRecentFiveArticle, setCounter, articleRequest, menuListRequest, articleRequestByCategory }
})
