<template>
    <div class="offcanvas offcanvas-start py-0" tabindex="-1" id="menubar" aria-labelledby="menubarLabel">
        <div class="offcanvas-header fs-5 p-2 pb-0 px-2 align-items-center justify-content-center">
            <i class="bi bi-x-lg btn-close cursorp" data-bs-dismiss="offcanvas" aria-label="Close"></i>
        </div>
        <div class="offcanvas-body p-0 pt-3 m-0 d-flex flex-column">
            <span class="px-4">Menu</span>
            <ul class="list-group p-0 m-0">
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5" v-for="menu in store.getMenuList" @click.prevent="redirector('menu', menu.lid as number)" data-bs-dismiss="offcanvas">
                    <span>{{ "ㄴ " + menu.menuName }}</span>
                </li>
            </ul>
            <hr />
            <span class="px-4">Recent Articles</span>
            <ul class="list-group p-0 m-0">
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5" v-for="(dto, index) in MenubarInfo.recentArticle" :key="index" @click.prevent="redirector('article', (dto as any).aid)">
                    <span>{{ index + 1 + ". " + (dto as any).title }}</span>
                </li>
            </ul>
            <hr />
            <span class="px-4">Counter</span>
            <span class="px-5"> Today : {{MenubarInfo.visitorInfo.today}}</span>
            <span class="px-5"> Total : {{MenubarInfo.visitorInfo.total}}</span>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from "vue-router";
    import { useBlogStore } from "@/store/blogStore";
    import { onMounted, reactive } from "vue";

    const router = useRouter();
    const store = useBlogStore();
    const MenubarInfo = reactive<{ menuList: menuList[]; recentArticle: Object[]; visitorInfo: visitState }>({
        recentArticle: [],
        menuList: [],
        visitorInfo: { today: store.getVisitCounter.today, total: store.getVisitCounter.today },
    });

    const getRecentArticleList = () => {
        store.articleRequest(0, 5).then((res) => {
            MenubarInfo.recentArticle = res.data.dtoList;
        });
    };

    const redirector = (which: string, number: number) => {
        switch (which) {
            case "article":
                router.push(`/read?id=${number}`).then(() => {
                    router.go(0);
                });
                break;

            case "menu":
                router.push(`/category?id=${number}`).then(() => {
                    router.go(0);
                });
                break;
        }
    };

    const setVisitorInfo = async (today:number, total:number)=>{
        MenubarInfo.visitorInfo.today = today
        MenubarInfo.visitorInfo.total = total
    }

    onMounted(() => {
        getRecentArticleList();
        store.menuListRequest();
        store.VisitCounterRequest().then(()=>setVisitorInfo(store.getVisitCounter.today, store.getVisitCounter.total))
        
    });
</script>
<style lang="sass" scoped>
    @import "MenuBar.sass"
</style>
