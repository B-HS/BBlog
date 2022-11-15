<template>
    <div class="reply p-2 d-flex gap-3 align-items-center">
        <div class="reply-img w-5">
            <img :src="`./blogapi/article/images/${props.reply?.member.userimg}`" class="img-fluid rounded-circle" alt="" />
        </div>
        <div class="reply-desc w-95 d-flex flex-column">
            <div class="reply-desc_namesection d-flex gap-1 align-items-baseline">
                <span class="reply-desc_namesection__name">{{props.reply?.member?.nickname}}</span>
                <span class="reply-desc_namesection__date">{{props.dateFormatter(new Date(props.reply?.regdate))}}</span>
            </div>
            <span class="reply-desc_desc">{{props.reply?.context}}</span>
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
import { onMounted } from 'vue';

    const props = defineProps({
        reply: { type: Object, required: false },
        dateFormatter: {type : Function, required: true}
    });

    onMounted(() => {
        console.log(props.reply);
        
        
        
    })
</script>
<style lang="sass">

    @import 'Reply.sass'
</style>
