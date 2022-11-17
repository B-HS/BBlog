<template>
    <div class="reply p-2 d-flex gap-3 align-items-center position-relative" :style="`margin-left:${30*props.reply?.replySort}px`">
        <div class="reply-img w-5">
            <img :src="`./blogapi/article/images/${props.reply?.member.userimg}`" class="img-fluid rounded-circle" alt="" ref="replyImg" />
        </div>
        <div class="reply-desc w-95 d-flex flex-column">
            <div class="reply-desc_namesection d-flex gap-1 align-items-baseline">
                <span class="reply-desc_namesection__name">{{ props.reply?.member?.nickname }}</span>
                <span class="reply-desc_namesection__date">{{ props.dateFormatter(new Date(props.reply?.regdate)) }}</span>
            </div>
            <span class="reply-desc_desc">{{ props.reply?.context }}</span>
            <div class="reply-desc_function d-flex gap-2">
                <span v-if="props.reply?.replySort==0" class="reply-desc_function_rereply" data-bs-toggle="collapse" :href="`#replytoreply${props.reply?.rid}`" role="button" aria-expanded="false" :aria-controls="`#replytoreply${props.reply?.rid}`" @click="imgDisable">{{ replyBtnText }}</span>
                <span v-if="props.reply?.replySort==0">|</span>
                <span class="reply-desc_function_rereply">수정</span>
                <span>|</span>
                <span class="reply-desc_function_rereply">삭제</span>
            </div>
            <div class="collapse mt-3 px-2" :id="`replytoreply${props.reply?.rid}`">
                <div class="userinfo w-50 d-flex gap-3 py-2">
                    <div class="input-group flex-nowrap">
                        <input type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="addon-wrapping" v-model="inputStatus.name" />
                    </div>
                    <div class="input-group flex-nowrap">
                        <input type="text" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" v-model="inputStatus.pwd" />
                    </div>
                </div>
                <div class="input-group flex-nowrap">
                    <input class="form-control w-100" placeholder="Context" aria-label="Context" v-model="inputStatus.context" />
                </div>
                <button class="btn" @click.prevent="submitReply" ref="submitBtn">답글 달기</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useBlogStore } from "@/store/blogStore";
    import { useUserStore } from "@/store/userStore";
    import { reactive, ref } from "vue";
    const id:number = new URLSearchParams(window.location.search).get("id") as unknown as number
    const replyImg = ref<HTMLElement>();
    const replyBtnText = ref<string>("답글");
    const submitBtn = ref<HTMLElement>();
    const store = useBlogStore();
    const userStore = useUserStore();
    const inputStatus = reactive<{name: string, pwd:string, context:string}>({
        name: "",
        pwd: "",
        context: "",
    });
    const props = defineProps({
        reply: { type: Object, required: false },
        dateFormatter: { type: Function, required: true },
        reloader: { type: Function, required: true },
    });

    console.log(props.reply);

    const imgDisable = () => {
        replyImg.value?.parentElement?.classList.toggle("displaynone");
        replyBtnText.value == "답글" ? (replyBtnText.value = "답글취소") : (replyBtnText.value = "답글");
    };

    // (aid: number, userName: string, isLogged: boolean, pwd: string, context: string, group: number, sort: number) => {
    const submitReply = async () => {
        await store.replyAddRequest(id, inputStatus.name, userStore.getUserId ? true : false, inputStatus.pwd, inputStatus.context, props.reply?.replyGroup, 1)
        await props.reloader()
        submitBtn.value?.parentElement?.classList.toggle("show")
        imgDisable()
    };
</script>
<style lang="sass">

    @import 'Reply.sass'
</style>
