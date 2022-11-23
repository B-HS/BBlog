<template>
    <div>
        <div class="adminheader">
            <ul class="list-group list-group-horizontal-md h-auto w-100 bg-black rounded-0 justify-content-between px-3">
                <li @click="menuSelector(0)" class="border border-0 list-group-item bg-black rounded-0 text-white d-flex align-items-center">관리자 홈</li>
                <li @click="menuSelector(1)" class="border border-0 list-group-item bg-black rounded-0 text-white d-flex align-items-center">글 관리</li>
                <li @click="menuSelector(2)" class="border border-0 list-group-item bg-black rounded-0 text-white d-flex align-items-center">댓글 관리</li>
                <li @click="menuSelector(3)" class="border border-0 list-group-item bg-black rounded-0 text-white d-flex align-items-center">회원 관리</li>
            </ul>
        </div>
        <div class="admincontext">
            <AdminHomeVue v-if="menu == 0"></AdminHomeVue>
            <AdminArticle v-if="menu == 1"></AdminArticle>
            <AdminReply v-if="menu == 2"></AdminReply>
            <AdminUser v-if="menu == 3"></AdminUser>
        </div>
    </div>
</template>
<script setup lang="ts">
    import AdminArticle from "@/components/Admin/AdminArticle/AdminArticle.vue";
    import AdminHomeVue from "@/components/Admin/AdminHome/AdminHome.vue";
    import AdminReply from "@/components/Admin/AdminReply/AdminReply.vue";
    import AdminUser from "@/components/Admin/AdminUser/AdminUser.vue";
    import router from "@/router";
    import { useUserStore } from "@/store/userStore";
    import { ref } from "vue";

    const store = useUserStore()
    if(!store.getIsAdmin){
        router.push("/")
    }

    let menu = ref<number>(0);

    const menuSelector = (num: number) => {
        menu.value = num;
    };
</script>
<style lang="sass" scoped>
    @import "Admin.sass"
</style>
