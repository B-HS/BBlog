<template>
    <div class="reply p-2 d-flex gap-3 align-items-center position-relative" :style="`margin-left:${30 * props.reply?.replySort}px`">
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
                <span v-if="props.reply?.replySort == 0" class="reply-desc_function_rereply" data-bs-toggle="collapse" :href="`#replytoreply${props.reply?.rid}`" role="button" aria-expanded="false" :aria-controls="`#replytoreply${props.reply?.rid}`" @click="imgDisable">{{ replyBtnText }}</span>
                <span v-if="props.reply?.replySort == 0">|</span>
                <span class="reply-desc_function_rereply cursorp" data-bs-toggle="modal" :data-bs-target="`#modify${props.reply?.rid}`">수정</span>
                <span>|</span>
                <span class="reply-desc_function_rereply cursorp" data-bs-toggle="modal" :data-bs-target="`#deleteModal${props.reply?.rid}`">삭제</span>
            </div>
            <div class="collapse mt-3 px-2" :id="`replytoreply${props.reply?.rid}`">
                <div class="userinfo w-50 d-flex gap-3 py-2">
                    <div class="input-group flex-nowrap">
                        <input v-if="!userStore.getUserId" type="text" class="form-control" placeholder="Name" aria-label="Name" aria-describedby="addon-wrapping" v-model="inputStatus.name" />
                        <span v-else class="form-control border-0 px-0">{{"닉네임: " +userStore.getUserInfo.username}}</span>
                    </div>
                    <div class="input-group flex-nowrap" v-if="!userStore.getUserId">
                        <input type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="addon-wrapping" v-model="inputStatus.pwd" />
                    </div>
                </div>
                <div class="input-group flex-nowrap">
                    <input class="form-control w-100" placeholder="Context" aria-label="Context" v-model="inputStatus.context" />
                </div>
                <button class="btn" @click.prevent="submitReply" ref="submitBtn">답글 달기</button>
            </div>
        </div>
        <div class="modal fade" :id="`deleteModal${props.reply?.rid}`" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content border-0 rounded-0">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteModalLabel">댓글 삭제</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column gap-3">
                        <span> {{ userStore.getUserId ? "삭제를 입력해주세요" : "비밀번호를 입력해주세요" }}</span>
                        <div class="input-group">
                            <span class="input-group-text rounded-0">{{ "비밀번호" }}</span>
                            <input type="password" aria-label="비밀번호" class="form-control rounded-0" v-model="inputStatus.deletePwd" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-danger" @click.prevent="replyDelete(props.reply?.rid, inputStatus.deletePwd)" data-bs-dismiss="modal">삭제</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" :id="`modify${props.reply?.rid}`" tabindex="-1" aria-labelledby="modifyLabel" aria-hidden="true">
            <div class="modal-dialog modal-xl modal-dialog-centered">
                <div class="modal-content border-0 rounded-0">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modifyLabel">댓글 수정</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body d-flex flex-column gap-3">
                        <div class="input-group">
                            <span class="input-group-text rounded-0">댓글 내용</span>
                            <input class="form-control rounded-0" v-model="inputStatus.modifyContext" />
                        </div>
                        <span> {{ userStore.getUserId ? "수정을 입력해주세요" : "비밀번호를 입력해주세요" }}</span>
                        <div class="input-group">
                            <span class="input-group-text rounded-0">{{ userStore.getUserId ? "수정" : "비밀번호" }}</span>
                            <input type="password" aria-label="비밀번호" class="form-control rounded-0" v-model="inputStatus.deletePwd" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-warning" @click.prevent="replyModify(props.reply?.rid, inputStatus.modifyContext, inputStatus.deletePwd)" data-bs-dismiss="modal">수정</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useBlogStore } from "@/store/blogStore";
    import { useUserStore } from "@/store/userStore";
    import { reactive, ref } from "vue";
    const id: number = new URLSearchParams(window.location.search).get("id") as unknown as number;
    const replyImg = ref<HTMLElement>();
    const replyBtnText = ref<string>("답글");
    const submitBtn = ref<HTMLElement>();
    const store = useBlogStore();
    const userStore = useUserStore();
    const inputStatus = reactive<{ name: string; pwd: string; context: string; deletePwd: string; modifyContext: string }>({
        name: "",
        pwd: "",
        context: "",
        deletePwd: "",
        modifyContext: "",
    });
    const props = defineProps({
        reply: { type: Object, required: false },
        dateFormatter: { type: Function, required: true },
        reloader: { type: Function, required: true },
    });

    const imgDisable = () => {
        replyImg.value?.parentElement?.classList.toggle("displaynone");
        replyBtnText.value == "답글" ? (replyBtnText.value = "답글취소") : (replyBtnText.value = "답글");
    };

    const submitReply = async () => {
        store
            .replyAddRequest(id, inputStatus.name, userStore.getUserId ? true : false, inputStatus.pwd, inputStatus.context, props.reply?.replyGroup, 1)
            .then(() => props.reloader())
            .then(() => {
                submitBtn.value?.parentElement?.classList.toggle("show");
                imgDisable();
            });
    };

    const replyDelete = (rid: number, passwd: string) => {
        store.replyRemoveRequest(rid, passwd, userStore.getUserId ? true : false, { mid: userStore.getUserNum as number })?.then(() => props.reloader());
    };

    const replyModify = (rid: number, context:string, passwd: string)=>{
        store.replyModifyRequest(rid, passwd, userStore.getUserId ? true : false, { mid: userStore.getUserNum as number }, context, props.reply?.replyGroup, props.reply?.replySort, id)?.then((res) => {
            props.reloader()});
    }
</script>
<style lang="sass">
    @import 'Reply.sass'
</style>
