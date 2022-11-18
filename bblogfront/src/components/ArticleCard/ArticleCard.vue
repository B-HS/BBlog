<template>
    <div class="articlecard p-0 h-100">
        <router-link :to="`./read?id=${state.id}`" class="d-flex justify-content-between flex-column h-100">
            <img :src="getImgae(props.dto.imgFileName)" class="w-100 cardimg" alt="" />
            <div class="textpart h-50">
                <div class="textpart-description h-85 p-3">
                    <h4>{{ state.title }}</h4>
                    <p class="px-2 fs-6">{{ descriptionFixer(state.description) }}</p>
                </div>
                <div class="textpart-info px-2 d-flex justify-content-between align-items-center h-15">
                    <span class="textpart-info__date">{{ state.date.split("-").slice(0, 2).join("-") + "-" + state.date.split("-")[2].split("T")[0] }}</span>
                    <span class="textpart-info__comment bi bi-chat-text">{{ ` ${state.commentNum ? state.commentNum : 0} ` }}</span>
                </div>
            </div>
        </router-link>
    </div>
</template>
<script setup lang="ts">
    import { reactive } from "vue";

    const props = defineProps({
        dto: { type: Object, required: true },
    });

    const state = reactive<{ id: number; title: string; description: string; date: string; commentNum: number }>({
        id: props.dto.aid,
        title: props.dto.title,
        description: props.dto.context,
        date: props.dto.regdate,
        commentNum: props.dto.replyCount,
    });

    const descriptionFixer = (desc: string) => {
        return desc.length > 100 ? htmlTotext(desc.slice(0, 100)) + "..." : htmlTotext(desc);
    };
    
    const getImgae = (name: string) => {
        return name === null ? `./blogapi/article/images/basic.png` : `./blogapi/article/images/${name}`;
    };

    const htmlTotext = (html: string) => {
        let tag: HTMLElement = document.createElement("p");
        tag.innerHTML = html;
        return tag.textContent;
    };

    
    
</script>
<style lang="sass">
    @import "ArticleCard.sass"
</style>
