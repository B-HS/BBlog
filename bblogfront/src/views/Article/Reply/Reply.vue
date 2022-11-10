<template>
    <div class="reply p-2 d-flex gap-3 align-items-center">
        <div class="reply-img w-5">
            <img src="./basic.png" class="img-fluid rounded-circle" alt="">
        </div>
        <div class="reply-desc w-95 d-flex flex-column">
            <div class="reply-desc_namesection d-flex gap-1 align-items-baseline">
                <span class="reply-desc_namesection__name">도레미</span>
                <span class="reply-desc_namesection__date">2022.09.09</span>
            </div>
            <span class="reply-desc_desc">파솔라시도</span>
            <div class="reply-desc_function d-flex gap-2">
                <span class="reply-desc_function_rereply">답글</span>
                <span>|</span>
                <span class="reply-desc_function_rereply">수정</span>
                <span>|</span>
                <span class="reply-desc_function_rereply">삭제</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="sass">
    @import 'Reply.sass'
</style>