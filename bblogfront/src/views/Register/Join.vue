<template>
    <div class="join d-flex justify-content-center p-5 align-items-center">
        <div class="joinbody w-33 h-50 border p-3 d-flex flex-column gap-3 justify-content-between">
            <div class="joinbody-header my-2 px-2">
                <h3>사이트 가입</h3>
            </div>
            <div class="join-body-body d-flex flex-column gap-2">
                <div class="form-floating mb-3 w-100">
                    <input type="nickname" class="form-control" id="floatingInput" ref="nickname" placeholder="name@example.com" />
                    <label for="floatingInput">닉네임</label>
                </div>
                <div class="form-floating mb-3 w-100">
                    <input type="email" class="form-control" id="floatingInput" ref="email" placeholder="name@example.com" :disabled="checkedEmail.check" :readonly="checkedEmail.check"/>
                    <label for="floatingInput" :disabled="checkedEmail.check" :readonly="checkedEmail.check">이메일</label>
                    <button class="emailbtn position-absolute border-0 border-start" @click.prevent="emailDupeCheck">중복확인</button>
                </div>
                <div class="form-floating">
                    <input type="password" class="form-control" id="floatingPassword" ref="password" placeholder="Password" />
                    <label for="floatingPassword">비밀번호</label>
                </div>
            </div>
            <div class="join-body-footer d-flex justify-content-between gap-3 my-2">
                <span ref="warningbox"></span>
                <button type="button" class="btn btn-transparent" @click.prevent="join">가입하기</button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useUserStore } from "@/store/userStore";
    import { useRouter } from "vue-router";
    import { reactive, ref, type Ref } from "vue";
    const EMAIL_REGEX = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const nickname = ref<HTMLInputElement>();
    const email = ref<HTMLInputElement>();
    const password = ref<HTMLInputElement>();
    const warningbox = ref<HTMLElement>();
    const router = useRouter();
    const store = useUserStore();
    const checkedEmail = reactive<{email:string, check:boolean}>({
        email:"",
        check:false
    })
    const join = () => {
        if (formvali(nickname) && formvali(email) && formvali(password) && checkedEmail.check) {
            store.join(nickname.value?.value!, checkedEmail.email, password.value?.value!).then((res) => {
                if (res.data) {
                    router.push("/login");
                } else {
                    warningbox.value!.textContent = `가입에 실패하였습니다 재시도해주세요`;
                    formReset();
                }
            });
        }
    };

    const formvali = (ele: Ref<HTMLInputElement | undefined>) => {
        invalidReset();
        if (!ele.value?.value || ele.value?.value.trim().length == 0) {
            warningbox.value!.textContent = `${ele.value!.parentElement!.childNodes[1].textContent}칸을 채워주세요`;
            ele.value?.focus();
            ele.value?.classList.toggle("is-invalid");
            return false;
        } else {
            if (ele.value!.parentElement!.childNodes[1].textContent == "이메일" && !emailInvalidCheck(ele.value.value)) {
                warningbox.value!.textContent = `잘못된 이메일 형식입니다`;
                ele.value?.focus();
                return false;
            }
            return true;
        }
    };
    const invalidReset = () => {
        nickname.value?.classList.remove("is-invalid");
        email.value?.classList.remove("is-invalid");
        password.value?.classList.remove("is-invalid");
    };

    const formReset = () => {
        nickname.value!.value = "";
        email.value!.value = "";
        password.value!.value = "";
    };

    const emailInvalidCheck = (text: string) => {
        return EMAIL_REGEX.test(email.value!.value);
    };

    const emailDupeCheck = () => {
        if (checkedEmail.check){
            return
        }
        if (!email.value!.value) {
            warningbox.value!.textContent = "이메일란이 빈칸입니다";
            return
        }
        if (!emailInvalidCheck(email.value!.value)){
            warningbox.value!.textContent = `잘못된 이메일 형식입니다`;
            email.value?.classList.add("is-invalid")
            email.value?.focus();
            return
        }
        store.emailDupeCheck(email.value!.value).then((res) => {
            if(res.data){
                warningbox.value!.textContent = "존재하는 이메일입니다"
                email.value?.classList.add("is-invalid")
                email.value?.focus();
            }else{
                warningbox.value!.textContent = ""
                email.value?.classList.remove("is-invalid")
                checkedEmail.email=email.value!.value
                checkedEmail.check=true
            }
        });
    };
</script>
<style lang="sass">
    @import "Join.sass"
</style>
