<template>
    <div class="p-3 pt-5 articlesection d-flex flex-column align-items-center justify-content-center gap-3 w-100">
        <div class="articlesection_article w-100 boxsing">
            <h6 class="category">{{ store.getMenuList.length > 0 ? store.getMenuList[articleInfo.category].menuName : "on Loading" }}</h6>
            <div></div>
            <h1 class="title">{{ articleInfo.title }}</h1>
            <div class="etc d-flex justify-content-between">
                <span class="date">{{ dateFormatter(articleInfo.date as Date) }}</span>
                <span class="count"> 조회수 : {{ articleInfo.count }}</span>
            </div>
            <hr />
            <span v-html="articleInfo.description"></span>
        </div>

        <div class="articlesection_function boxsing w-100 d-flex align-items-center px-3">
            <i class="bi bi-tag"></i>
            <ul class="list-group list-group-horizontal">
                <li class="list-group-item border border-0" v-for="i in articleInfo.tag" :key="i"># {{ i }}</li>
            </ul>
        </div>

        <div class="articlesection_reply boxsing p-3 w-100">
            <form action="" class="replyform d-flex flex-column gap-2">
                <div class="reply-info d-flex flex-column gap-2">
                    <div class="input-group flex-nowrap">
                        <span class="input-group-text border border-0 rounded-0 justify-content-center" id="addon-wrapping">사용자명</span>
                        <input v-if="!userStore.getUserId" type="text" class="form-control border border-0 rounded-0" aria-label="Username" aria-describedby="addon-wrapping" v-model="inputStatus.name" />
                        <span v-else class="form-control border border-0 rounded-0">{{ userStore.getUserInfo.username }}</span>
                    </div>
                    <div class="input-group flex-nowrap" v-if="!userStore.getUserId">
                        <span class="input-group-text border border-0 rounded-0 justify-content-center" id="addon-wrapping">비밀번호</span>
                        <input type="password" class="form-control border border-0 rounded-0" aria-label="Username" aria-describedby="addon-wrapping" v-model="inputStatus.pwd" />
                    </div>
                </div>
                <div class="reply-input d-flex gap-2">
                    <div class="input-group">
                        <span class="input-group-text border border-0 rounded-0 justify-content-center">댓글 내용</span>
                        <textarea class="form-control border border-0 rounded-0 replytextarea" v-model="inputStatus.context"></textarea>
                    </div>
                    <button type="submit" class="text-nowrap border border-0 p-3" @click.prevent="submitReply">등록</button>
                </div>
            </form>
        </div>

        <div class="articlesection_replylist boxsing p-3 w-100 d-flex flex-column gap-3">
            <span v-if="!articleInfo.reply">등록된 댓글이 없습니다.</span>
            <Reply v-for="i in articleInfo.reply" :reply="i" :dateFormatter="dateFormatter" :reloader="getArticleInfo"></Reply>
        </div>
    </div>
</template>
<script setup lang="ts">
    import axios from "@/store/axios";
    import { useBlogStore } from "@/store/blogStore";
    import { useUserStore } from "@/store/userStore";
    import { onMounted, reactive } from "vue";
    import Reply from "./Reply/Reply.vue";
    const id = new URLSearchParams(window.location.search).get("id") as unknown as number;
    const articleInfo = reactive<{ category: number; title: string; count: number; description: string; tag?: string[]; reply?: Object | null; date: Date }>({
        category: 0,
        title: "",
        count: 0,
        description: "",
        tag: [],
        date: new Date(),
    });

    const inputStatus = reactive<{ name: string; pwd: string; context: string }>({
        name: "",
        pwd: "",
        context: "",
    });

    const store = useBlogStore();
    const userStore = useUserStore();

    const dateFormatter = (date: Date): string => {
        const dateAry: string[] = date.toISOString().split("-");
        return `${dateAry[0]}년 ${dateAry[1]}월 ${dateAry[2].split("T")[0]}일 ${dateAry[2].split("T")[1].split(":")[0]}:${dateAry[2].split("T")[1].split(":")[1]}`;
    };

    const getArticleInfo = () => {
        axios.get(`/article/${id}`).then((res) => {
            articleInfo.category = res.data.menuid - 1;
            articleInfo.title = res.data.title;
            articleInfo.count = res.data.visitor;
            articleInfo.description = res.data.context;
            articleInfo.tag = res.data.hashtag;
            articleInfo.date = new Date(new Date(res.data.regdate).getTime() + 1000 * 60 * 60 * ((new Date().getTimezoneOffset() / 60) * -1));
            if (res.data.reply.length > 0) {
                articleInfo.reply = res.data.reply;
            } else {
                articleInfo.reply = null;
            }
        });
    };

    const submitReply = async () => {
        await store.replyAddRequest(id, inputStatus.name, userStore.getUserId ? true : false, inputStatus.pwd, inputStatus.context, articleInfo.reply ? (articleInfo.reply as Array<Object>).length : 0, 0).then((res) => {
            if (res.status == 200) {
                inputStatus.name = "";
                inputStatus.pwd = "";
                inputStatus.context = "";
                getArticleInfo();
            }else{
                
            }
        });
    };
    onMounted(() => {
        getArticleInfo();
        window.scrollTo(0, 0);
    });
</script>
<style lang="sass" scoped>
    @import "Article.sass"
</style>
