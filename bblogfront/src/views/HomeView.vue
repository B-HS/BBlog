<template>
    <div class="mainpage">
        <div class="mainpage-introduce">
            <h2 class="px-5">BIO</h2>
            <Introduce></Introduce>
        </div>

        <div class="cardsection-title px-5">
            <h2>Recent Articles</h2>
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
    import Introduce from "@/components/Introduce/Introduce.vue";
    import { useBlogStore } from "@/store/blogStore";
    import type { AxiosResponse } from "axios";
    import { reactive } from "vue";
    const store = useBlogStore();
    const articleState = reactive<{ id?: number; dtoList: Object[]; totalPage: number; currentPage: number }>({
        dtoList: [],
        totalPage: 1,
        currentPage: 0,
    });

    const setArticleInfo = (res: AxiosResponse) => {
        res.data.dtoList.forEach((element: object) => {
            articleState.dtoList?.push(JSON.parse(JSON.stringify(element)));
        });
        articleState.totalPage = res.data.totalPage;
        articleState.currentPage = res.data.currentPage;
    };

    const scrollHandler = () => {
        if (window.scrollY + window.innerHeight >= document.body.scrollHeight && articleState.currentPage < articleState.totalPage) {
            store.articleRequest(articleState.currentPage + 1, 15).then((res) => setArticleInfo(res));
        }
    };

    window.addEventListener("scroll", scrollHandler);
    store
        .articleRequest(articleState.currentPage, 15)
        .then((res) => {setArticleInfo(res)})
</script>
<style scoped lang="sass">
    .mainpage
        padding: 15rem
        padding-top: 1rem
    .cardsection
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
        gap: 3rem
    li
        background-color: white
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px
        cursor: pointer
</style>
