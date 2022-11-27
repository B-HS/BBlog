<template>
    <div>
        <div class="modal fade" id="settingModal" tabindex="-1" aria-labelledby="settingModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="settingModalLabel">계정 설정</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="modal-body-header">
                            <ul class="list-group list-group-horizontal text-center mb-2">
                                <li :class="`list-group-item rounded-0 w-100 ${settingInfo.which == 'nickname' ? 'active' : ''}`" @click="menuSelector('nickname')">닉네임 변경</li>
                                <li :class="`list-group-item rounded-0 w-100 ${settingInfo.which == 'declaration' ? 'active' : ''}`" @click="menuSelector('declaration')">회원 탈퇴</li>
                            </ul>
                            <div v-if="settingInfo.which == 'nickname'" class="modal-body-nickname d-flex flex-column gap-2">
                                <form class="form-floating">
                                    <input type="text" class="form-control" id="currentnickname" placeholder="userStroe.getUserInfo.username" v-model="userStroe.getUserInfo.username" readonly disabled />
                                    <label for="currentnickname">현재 닉네임</label>
                                </form>
                                <form class="form-floating">
                                    <input type="text" class="form-control" id="changednickname" placeholder="" v-model="settingInfo.changedNickname" />
                                    <label for="changednickname">변경 닉네임</label>
                                </form>
                                <form class="form-floating">
                                    <input type="password" class="form-control" id="nickpasswd" placeholder="" v-model="settingInfo.changedpasswd" />
                                    <label for="nickpasswd">비밀번호</label>
                                </form>
                            </div>
                            <div v-if="settingInfo.which == 'declaration'" class="modal-body-declaration d-flex flex-column gap-2">
                                <form class="form-floating">
                                    <input type="password" class="form-control" id="depasswd" placeholder="" v-model="settingInfo.changedpasswd" />
                                    <label for="depasswd">비밀번호</label>
                                </form>
                                <form class="form-floating">
                                    <input type="password" class="form-control" id="derepassword" placeholder="" v-model="settingInfo.changedrepasswd" />
                                    <label for="derepassword">비밀번호 재입력</label>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <span>{{ settingInfo.status }}</span>
                        <div class="nicknamebtn d-flex gap-1" v-if="settingInfo.which == 'nickname'">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                            <button type="button" class="btn btn-primary" @click="nickChange">변경</button>
                        </div>
                        <div class="nicknamebtn d-flex gap-1" v-if="settingInfo.which == 'declaration'">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
                            <button type="button" class="btn btn-danger" @click="declaration">탈퇴</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useBlogStore } from "@/store/blogStore";
    import { useUserStore } from "@/store/userStore";
    import { reactive } from "vue";
    import { useRouter } from "vue-router";
    const router = useRouter()
    const userStroe = useUserStore();
    const blogStore = useBlogStore();
    const settingInfo = reactive<{ which: string; changedNickname: string; changedpasswd: string; changedrepasswd: string; status: string }>({
        which: "nickname",
        changedNickname: "",
        changedpasswd: "",
        changedrepasswd: "",
        status: "",
    });
    const menuSelector = (name: string) => {
        settingInfo.which = name;
        (settingInfo.changedpasswd = ""), (settingInfo.changedrepasswd = "");
    };

    const nickChange = () => {
        blogStore.nicknameChangeRequest(settingInfo.changedNickname, settingInfo.changedpasswd).then((res) => {
            res == true ? (settingInfo.status = "닉네임이 변경되었습니다") : "변경에 실패하였습니다";
            settingFromReset()
        });
    };

    const declaration = () => {
        blogStore.declarationRequest(settingInfo.changedpasswd, settingInfo.changedrepasswd)?.then((res) => {
            if(res==true){
                router.go(0);
            }
        });
    };
    const settingFromReset = () => {
        settingInfo.changedNickname = "";
        settingInfo.changedpasswd = "";
        settingInfo.changedrepasswd = "";
    };
</script>
<style lang="sass"></style>
