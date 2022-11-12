<template>
    <div class="adminhome border d-flex flex-column align-items-center py-5 gap-3">
        <div class="visitorgraph border border-1">
            <div class="visitorgraph-graph">graph</div>
        </div>
        <div class="visitordetail">
            <div class="visitordetail-totals">
                <span>Today</span>
                <span>Total</span>
            </div>
            <div class="visitordetail-article d-flex flex-column">
                <span v-for="i in 10" :key="i">{{i}}번째 글</span>
            </div>
            <div class="visitingtype">
                visit
            </div>
        </div>

        <div class="recent">
            <div class="recent-reply d-flex flex-column">
                <span v-for="i in 10" :key="i">{{i}}댓글</span>
            </div>
            <div class="recent-articles d-flex flex-column">
                <span v-for="i in 10" :key="i">{{i}}번 글</span>
            </div>
            <div class="recent-user d-flex flex-column">
                <span v-for="i in 10" :key="i">{{i}}번 유저</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="sass" scoped>
    @import "AdminHome.sass"
</style>