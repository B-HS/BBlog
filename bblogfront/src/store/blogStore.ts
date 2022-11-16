import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import axios from 'axios'

export const useBlogStore = defineStore("blogInfo", () => {
    const state = reactive<{ menu: Object, topRecentFiveArticle: Object, counter: number[] }>({
        menu: new Object,
        topRecentFiveArticle: new Object,
        counter: []
    })

    const setMenuList = (menuList: Object) => {
        state.menu = menuList;
    }
    const setTopRecentFiveArticle = () => { }
    const setCounter = () => { }


    const getMenuList = computed(() => state.menu)
    const getTopRecentFiveArticle = computed(() => state.topRecentFiveArticle)
    const getCounter = computed(() => state.counter)

    const articleRequest = (requestedPage: Number, totalPageSize: number) => {
        return axios.post("/article/recent", { requestedPage: requestedPage, totalPageSize: totalPageSize })
    }

    const articleRequestByCategory = (requestedPage: Number, totalPageSize: number, id: String | null) => {
        return axios.post(`/category/${id}`, { requestedPage: requestedPage, totalPageSize: totalPageSize })
    }

    const menuListRequest = () => {
        return axios.get("/menulist")
    }


    return { getMenuList, getTopRecentFiveArticle, getCounter, setMenuList, setTopRecentFiveArticle, setCounter, articleRequest, menuListRequest, articleRequestByCategory }
})
