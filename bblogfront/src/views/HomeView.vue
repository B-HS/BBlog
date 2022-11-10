<template>
    <div class="articlelist">
        <ul class="list-group list-group-horizontal justify-content-end gap-3 px-5">
            <li class="list-group-item border border-0 rounded-0">최신순</li>
            <li class="list-group-item border border-0 rounded-0">조회순</li>
        </ul>
        <div class="cardsection my-3 px-5">
            <div v-for="i in 50" :key="i">
                <router-link to="read"><ArticleCardVue></ArticleCardVue></router-link>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ArticleCardVue from '@/components/ArticleCard/ArticleCard.vue';

    
</script>
<style scoped lang="sass">
    .articlelist
        padding: 15rem
        padding-top: 3rem
    .cardsection
        display: grid
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))
        gap: 3rem
    li
        background-color: white
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px
        cursor: pointer
</style>
