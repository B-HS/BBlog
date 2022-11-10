<template>
    <div class="articlecard p-0 h-100">
        <img src="./basic.png" class="w-100 h-50" alt="" >
        <div class="textpart h-50">
            <div class="textpart-description h-85 p-3">
                <h4>{{state.title}}</h4>
                <p class="px-2 fs-6">{{descriptionFixer(state.description)}}</p>
            </div>
            <div class="textpart-info h-15 px-2 d-flex justify-content-between align-items-center">
                <span class="textpart-info__date">{{state.date}}</span>
                <span class="textpart-info__comment bi bi-chat-text">{{` ${state.commentNum}`}}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';


const state = reactive<{title:string, description:string, date:string, commentNum:number}>({
    title : "Title",
    description : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi doloribus delectus quam at exercitationem autem veritatis, quidem incidunt mollitia a ut porro repudiandae recusandae commodi nulla voluptates. Animi, commodi molestiae!",
    date : "2022/9/9",
    commentNum: 10
})

const descriptionFixer = (desc:string)=>{
    return desc.length>100?desc.slice(0, 100)+"...":desc
}

</script>
<style lang="sass">
    @import "ArticleCard.sass"
</style>