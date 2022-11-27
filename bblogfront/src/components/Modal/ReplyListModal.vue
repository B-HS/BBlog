<template>
    <div>
        <div class="modal fade" id="replyListModal" tabindex="-1" aria-labelledby="replyListModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header border-0">
                        <h1 class="modal-title fs-5" id="replyListModalLabel">댓글 목록</h1>
                    </div>
                    <div class="modal-body p-0">
                        <ul class="list-group list-group">
                            <li class="reply-title list-group-item rounded-0">
                                <div class="replyinfo d-flex justify-content-between">
                                    <span class="w-15 text-center">글 번호</span>
                                    <span class="w-60 text-center">댓글 내용</span>
                                    <span class="w-33 text-center">날짜</span>
                                </div>
                            </li>
                            <li class="list-group-item rounded-0" v-for="i in store.getReplyModalList">
                                <a :href="'/read?id=' + i.articleid"
                                    ><div class="replyinfo d-flex justify-content-between">
                                        <span class="w-15 text-center">{{ i.articleid }}번 글</span>
                                        <span class="w-60 text-center">{{ i.context }}</span>
                                        <span class="w-33 text-center">{{ dateFormatter(new Date(i.regdate)) }}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div class="modal-footer border-0 d-flex justify-content-between">
                        <span>최근 20개까지 표시됩니다</span>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useUserStore } from "@/store/userStore";
    const store = useUserStore();
    const dateFormatter = (date: Date): string => {
        const dateAry: string[] = date.toISOString().split("-");
        return `${dateAry[0]}년 ${dateAry[1]}월 ${dateAry[2].split("T")[0]}일`;
    };
</script>
<style lang="sass">
    .reply-title
        cursor: auto
</style>
