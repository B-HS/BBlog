<template>
    <div class="logout w-100 h-100 d-flex justify-content-center align-items-center">
        <h1>로그아웃 되었습니다</h1>
    </div>
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/userStore';
import { useRouter } from 'vue-router';
useUserStore().logout()
const router = useRouter()
setTimeout(() => {
    router.push("/").then(()=>{router.go(0)})
}, 1000);

</script>
<style scoped lang="sass">
    .logout
        height: 100vh !important
</style>