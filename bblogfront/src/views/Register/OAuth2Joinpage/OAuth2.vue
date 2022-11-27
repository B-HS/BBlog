<template>
    <div class="join d-flex justify-content-center p-5 align-items-center">
        <div class="joinbody w-33 h-50 border p-3 d-flex flex-column justify-content-between">
            <div class="joinbody-header my-2 px-2">
                <h3>추가정보 입력</h3>
                <h6 class="m-0">입력된 정보는 닉네임변경, 회원탈퇴 등에 사용됩니다</h6>
            </div>
            <div class="join-body-body d-flex flex-column gap-2">
                <div class="form-floating mb-3 w-100">
                    <input type="nickname" class="form-control" id="floatingInput" placeholder="" v-model="oauthInfo.changedNickname" />
                    <label for="floatingInput">닉네임</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" placeholder="" v-model="oauthInfo.pw" />
                    <label for="floatingPassword">비밀번호</label>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingRePassword" placeholder="" v-model="oauthInfo.repw" />
                    <label for="floatingRePassword">비밀번호 재입력</label>
                </div>
            </div>
            <div class="join-body-footer d-flex justify-content-end gap-3 my-2">
                <button type="button" class="btn btn-transparent" @click="oauthregi">등록하기</button>
            </div>
        </div>
        <div class="toast-container position-fixed top-0 start-50 translate-middle-x mt-5 pt-5 p-3">
            <div id="toast" ref="toast" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1250">
                <div class="toast-header d-flex justify-content-between">
                    <img src="@/assets/favicon.ico" class="img-fluid me-2 w-5" alt="Icon" />
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">
                    <p>{{ toastText }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useRouter } from "vue-router";
    import { reactive, ref, type Ref } from "vue";
    import { Toast } from "bootstrap";
    import { useBlogStore } from "@/store/blogStore";
    const pwcheck = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,16}$/;
    const nicknamecheck = /^[a-zA-Zㄱ-힣][a-zA-Zㄱ-힣 ]*$/;
    const toast = ref<HTMLElement>();
    const toastPopup = () => {
        new Toast(toast.value!).show();
    };

    const oauthInfo = reactive<{changedNickname: string; pw: string; repw: string }>({
        changedNickname: "",
        pw: "",
        repw: "",
    });
    const router = useRouter();
    const blogStore = useBlogStore();
    const toastText = ref<string>(" ");
    const setToastTextAndExcute = (text: string) => {
        toastText.value = text;
        toastPopup();
    };

    const oauthregi = () => {
        if (formValidator()) {
            blogStore.oauthRestInformationRequest(oauthInfo.changedNickname, oauthInfo.pw).then(res=>{
                if(res==true){
                    router.push("/")
                }else{
                    setToastTextAndExcute("잘못된 접근입니다")
                    setTimeout(() => {
                        router.push("/logout")    
                    }, 1500);
                    
                }
            });
        }
    };

    const formValidator = () => {
        if (!nicknamecheck.test(oauthInfo.changedNickname)) {
            setToastTextAndExcute("닉네임을 확인해주세요");
            setToastTextAndExcute("닉네임은 한글 혹은 영문만 가능합니다");
            return false;
        }
        if (!pwcheck.test(oauthInfo.pw) || !pwcheck.test(oauthInfo.repw)) {
            setToastTextAndExcute("비밀번호를 확인해주세요 \n\n 비밀번호는 8~16자, 영문과 숫자의 조합이어야합니다");
            return false;
        }
        if (oauthInfo.pw !== oauthInfo.repw) {
            setToastTextAndExcute("두 비밀번호가 서로 다릅니다");
            return false;
        }
        return true;
    };
</script>
<style lang="sass">
    @import "OAuth2.sass"
</style>
