<template>
    <div class="menupage">
        <div class="cardsection-title px-5">
            <h2>{{ store.getMenuList.length>0?store.getMenuList[id as unknown as number -1].menuName:"on Loading" }}</h2>
        </div>
        <div class="cardsection my-3 px-5">
            <div v-for="(obj, i) in menuState.dtoList" :key="i" ref="cardSection">
                <ArticleCardVue :dto="obj"></ArticleCardVue>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import ArticleCardVue from "@/components/ArticleCard/ArticleCard.vue";
    import { useBlogStore } from "@/store/blogStore";
    import type { AxiosResponse } from "axios";
    import { onMounted, reactive } from "vue";
    const store = useBlogStore();
    const id: number | string | null = new URLSearchParams(window.location.search).get("id");
    const menuState = reactive<{ id?: number; dtoList: Object[]; totalPage: number; currentPage: number}>({
        dtoList: [],
        totalPage: 1,
        currentPage: 0,
    });

    const setArticleInfo = (res: AxiosResponse) => {
        res.data.dtoList.forEach((element: object) => {
            menuState.dtoList?.push(JSON.parse(JSON.stringify(element)));
        });
        menuState.totalPage = res.data.totalPage;
        menuState.currentPage = res.data.currentPage;
    };
    const scrollHandler = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight && menuState.currentPage < menuState.totalPage) {
            store.articleRequestByCategory(menuState.currentPage, 15, id).then((res) => setArticleInfo(res));
        }
    };
    window.addEventListener("scroll", scrollHandler);
    onMounted(() => {
        store.articleRequestByCategory(menuState.currentPage, 15, id).then((res) => setArticleInfo(res));
    });
</script>
<style scoped lang="sass">
    @import 'MenuPage.sass'
</style>
