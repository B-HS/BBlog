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
            <div v-for="i in 50" :key="i">
                <router-link to="read"><ArticleCardVue></ArticleCardVue></router-link>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ArticleCardVue from '@/components/ArticleCard/ArticleCard.vue';
import Introduce from '@/components/Introduce/Introduce.vue';

    
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
