<template>
    <div class="loginpage d-flex justify-content-center align-items-center">
        <div class="loginbox p-3 d-flex justify-content-start align-items-center flex-column">
            <h2 class="mt-3 pt-3">Login</h2>
            <div class="inputarea d-flex flex-column gap-3 w-75 mt-3">
                <input type="text" placeholder="아이디" class="w-100 p-2" v-model="loginState.id" />
                <input type="password" placeholder="비밀번호" class="w-100 p-2" v-model="loginState.pw" />
                <button class="loginbtn btn border border-1 rounded-0 p-2" @click.prevent="login">Login</button>
            </div>
            <div class="btnarea d-flex justify-content-between w-75">
                <button class="btn px-0 py-3 text-nowrap border-0"><router-link to="/join">회원가입</router-link></button>
                <button class="btn px-0 py-3 text-nowrap border-0">계정 찾기</button>
            </div>
            <hr class="w-75 m-0" />
            <div class="socialarea d-flex justify-content-center w-75 gap-5">
                <i class="bi bi-google py-3 cursorp" @click="googleLogin"></i>
            </div>
        </div>
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x mt-5 p-3">
            <div id="toast" ref="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="2000">
                <div class="toast-header d-flex justify-content-between">
                    <img src="@/assets/favicon.ico" class="img-fluid me-2 w-5" alt="Icon" />
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">{{ toastText }}</div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useUserStore } from "@/store/userStore";
    import { Toast } from "bootstrap";
    import { reactive, ref } from "vue";
    import { useRouter } from "vue-router";
    import axios from "@/store/axios";
    const toast = ref<HTMLElement>();
    const toastText = ref<string>("");
    const setToastTextAndExcute = (text: string) => {
        toastText.value = text;
        new Toast(toast.value!).show();
    };
    const router = useRouter();
    const store = useUserStore();
    const loginState = reactive<{ id: string; pw: string }>({
        id: "",
        pw: "",
    });

    const login = () => {
        store.login(loginState.id, loginState.pw).then((res) => {
            if (res == true) {
                router.push("/").then(()=>store.getDropboxInfo().then(res=>{console.log(res)}))
            } else {
                setToastTextAndExcute("로그인에 실패하였습니다");
            }
        });
    };
    const googleLogin = () => {
        window.location.href = axios.getUri() + "/oauth2/google";
    };
</script>
<style lang="sass" scoped>
    @import "Login.sass"
</style>
