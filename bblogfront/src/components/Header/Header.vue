<template>
    <div class="navcontainer">
        <ul class="list-group list-group-horizontal-md h-auto w-100 bg-black rounded-0 justify-content-between px-3">
            <router-link to="/"><li class="border border-0 list-group-item bg-black rounded-0 text-white d-flex align-items-center">Hyunseok</li></router-link>
            <div class="icon-section d-flex">
                <div class="icon-section-admin d-flex" v-if="store.userToken">
                    <router-link to="setting"><li class="border border-0 list-group-item bg-black rounded-0 text-white bi bi-gear"></li></router-link>
                    <router-link to="write"><li class="border border-0 list-group-item bg-black rounded-0 text-white bi bi-pencil"></li></router-link>
                </div>
                <div class="icon-section-common d-flex" >
                    <li class="border border-0 list-group-item bg-black rounded-0 text-white bi bi-list text-nowrap" data-bs-toggle="offcanvas" data-bs-target="#menubar" aria-controls="menubar"> Menu</li>
                    <a href="https://github.com/B-HS" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="깃허브">
                        <li class="border border-0 list-group-item bg-black rounded-0 text-white bi-github"></li>
                    </a>
                    <a href="https://hbyun.tistory.com/" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="티스토리">
                        <li class="border border-0 list-group-item bg-black rounded-0 text-white bi bi-bootstrap"></li>
                    </a>
                    <a href="https://portfolio.hyns.co.kr/" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="포트폴리오 사이트">
                        <li class="border border-0 list-group-item bg-black rounded-0 text-white bi bi-file-text"></li>
                    </a>
                    <router-link to="login" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-custom-class="custom-tooltip" data-bs-title="로그인">
                        <li class="border border-0 list-group-item bg-black rounded-0 text-white bi bi-box-arrow-in-right"></li>
                    </router-link>
                </div>
            </div>
        </ul>
        <section class="scrollstat w-100">
            <div class="scrollstat-bar" ref="statbar"></div>
        </section>
        <MenuBar></MenuBar>
    </div>
</template>
<script setup lang="ts">
    import { Tooltip } from "bootstrap";
    import { onMounted, ref } from "vue";
    import MenuBar from "../Menu/MenuBar.vue";
    import { useUserStore } from "@/store/userStore";
    const statbar = ref();
    new Tooltip(document.body, {
        selector: "[data-bs-toggle='tooltip']",
    });

    const store = useUserStore()

    

    onMounted(() => {
        window.onscroll = () => scrollbar();
        const scrollbar = () => {
            let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            let scrolled = (winScroll / height) * 100;
            statbar.value.style.width = scrolled + "%";
        };
    });
</script>
<style lang="sass" scoped>
    @import "Header.sass"
</style>
