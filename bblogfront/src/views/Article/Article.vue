<template>
    <div class="p-3 pt-5 articlesection d-flex flex-column align-items-center justify-content-center gap-3 w-100">
        <div class="articlesection_article w-100 boxsing">
            <h6 class="category">더미카테고리</h6>
            <div></div>
            <h1 class="title">더미 타이틀</h1>
            <div class="etc d-flex justify-content-between">
                <span class="date">2022.09.09</span>
                <span class="count"> 조회수 : 9999</span>
            </div>
            <hr />
            <span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit accusamus magnam suscipit error dolores, temporibus, doloribus repudiandae dignissimos sunt cupiditate nemo totam eligendi! Illo saepe excepturi ea sed, libero porro. </span>
        </div>

        <div class="articlesection_function boxsing w-100 d-flex align-items-center px-3">
            <i class="bi bi-tag"></i>
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item border border-0" v-for="i in 5" :key="i">더미</li>
            </ul>
        </div>

        <div class="articlesection_reply boxsing p-3 w-100">
            <form action="" class="replyform d-flex flex-column gap-2">
                <div class="reply-info d-flex flex-column gap-2">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text border border-0 rounded-0 justify-content-center" id="addon-wrapping">사용자명</span>
                        <input type="text" class="form-control border border-0 rounded-0" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text border border-0 rounded-0 justify-content-center" id="addon-wrapping">비밀번호</span>
                        <input type="text" class="form-control border border-0 rounded-0" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                </div>
                <div class="reply-input d-flex gap-2">
                    <div class="input-group">
                        <span class="input-group-text border border-0 rounded-0 justify-content-center">댓글 내용</span>
                        <textarea class="form-control border border-0 rounded-0 replytextarea"></textarea>
                    </div>
                    <button type="submit" class="text-nowrap border border-0 p-3">등록</button>
                </div>
            </form>
        </div>

        <div class="articlesection_replylist boxsing p-3 w-100">
            <Reply></Reply>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { onMounted } from "vue";
    import Reply from "./Reply/Reply.vue";
    
    onMounted(()=>{
        window.scrollTo(0,0);
    })

    
</script>
<style lang="sass" scoped>
    @import "Article.sass"
</style>
