<template>
    <div class="adminhome d-flex flex-column align-items-center py-5 gap-3">
        <div class="visitorgraph border border-1 p-3">
            <div class="visitorgraph-graph">
                <Bar></Bar>
            </div>
        </div>
        <div class="visitordetail border">
            <div class="visitordetail-totals text-center border-bottom p-3">
                <span>Today : 90</span>
            </div>
            <div class="visitordetail-article d-flex flex-column p-3">
                <span v-for="i in 5" :key="i" :class="`bi bi-${i}-square`"> 번째 글</span>
            </div>
        </div>

        <div class="recent gap-3 d-flex justify-content-between">
            <div class="recent-reply d-flex flex-column p-3 border text-start w-33">
                <span v-for="i in 5" :key="i" :class="`bi bi-${i}-square`"> 댓글</span>
            </div>
            <div class="recent-articles d-flex flex-column p-3 border text-start w-33">
                <span v-for="i in 5" :key="i" :class="`bi bi-${i}-square`"> 번 글</span>
            </div>
            <div class="recent-user d-flex flex-column p-3 border text-start w-33">
                <span v-for="i in 5" :key="i" :class="`bi bi-${i}-square`"> 번 유저</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import Bar from "./Graph/Bar.vue";
</script>
<style lang="sass" scoped>
    @import "AdminHome.sass"
</style>
