<template>
    <div class="menupage">
        <div class="cardsection-title px-5">
            <h2>{{"- "+JSON.parse(JSON.stringify(store.getMenuList))[id as string].menuName}}</h2>
        </div>
        <div class="cardsection my-3 px-5">
            <div v-for="(obj, i) in articleState.dtoList" :key="i" ref="cardSection">
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
    const articleState = reactive<{ id?: number; dtoList: Object[]; totalPage: number; currentPage: number }>({
        dtoList: [],
        totalPage: 1,
        currentPage: 0,
    });

    const id:string|null = new URLSearchParams(window.location.search).get("id")

    const setArticleInfo = (res: AxiosResponse) => {
        res.data.dtoList.forEach((element: object) => {
            articleState.dtoList?.push(JSON.parse(JSON.stringify(element)));
        });
        articleState.totalPage = res.data.totalPage;
        articleState.currentPage = res.data.currentPage;
    };

    const scrollHandler = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight && articleState.currentPage < articleState.totalPage) {
            store.articleRequestByCategory(articleState.currentPage, 15, id).then((res) => setArticleInfo(res));
        }
    };

    window.addEventListener("scroll", scrollHandler);

    onMounted( async() => {
        store.articleRequestByCategory(articleState.currentPage, 15, id).then((res) => setArticleInfo(res));
    });
</script>
<style scoped lang="sass">
    @import 'MenuPage.sass'
</style>
