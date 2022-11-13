import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import axios from 'axios'

export const useBlogStore = defineStore("blogInfo", () => {
    const state = reactive<{ menu: Object, topRecentFiveArticle: Object, counter: number[] }>({
        menu: new Object,
        topRecentFiveArticle: new Object,
        counter: []
    })


    const setMenuList = () => { }
    const setTopRecentFiveArticle = () => { }
    const setCounter = () => { }


    const getMenuList = computed(()=> state.menu)
    const getTopRecentFiveArticle = computed(()=> state.topRecentFiveArticle)
    const getCounter = computed(()=> state.counter)


    return { getMenuList, getTopRecentFiveArticle, getCounter, setMenuList, setTopRecentFiveArticle, setCounter }
})
