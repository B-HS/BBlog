<template>
    <div class="px-5 mt-3 mb-5 d-flex flex-column gap-5">
        <div class="profile d-flex flex-column border border-1 p-3 align-items-start boxsha">
            <div class="profile-header"><i class="bi bi-person-fill p-1"></i>Introduce</div>
            <div class="profile-context d-flex w-100">
                <div class="profile-img w-25 d-flex align-items-center p-5">
                    <img src="https://portfolio.hyns.co.kr/img/selfieeee.85b51075.jpeg" alt="profile" class="img-fluid rounded-circle p-2" />
                </div>
                <div class="profile-description text-center w-75 p-3">
                    <div class="profile-description-context border border-1 p-2 mb-4">
                        <p>반갑습니다. 변현석입니다</p>
                        <p>코딩, 무언가 하나 해결 될 때의 그 짜릿함을 끊을 수가 없습니다</p>
                        <p>언제나 발전하는 코딩을 지향합니다</p>
                    </div>
                    <div class="profile-etc w-100 d-flex gap-3">
                        <ul class="list-group h-auto rounded-0 justify-content-start w-50 border border-1 p-3">
                            <span class="text-start"> <i class="bi bi-file-text"></i> Pages</span>
                            <div class="icon-section">
                                <div class="icon-section-common d-flex flex-column text-start">
                                    <a href="https://github.com/B-HS"><li class="border border-0 list-group-item rounded-0 bi-github">&nbsp;깃허브</li></a>
                                    <a href="https://hbyun.tistory.com/"><li class="border border-0 list-group-item rounded-0 bi bi-bootstrap">&nbsp;티스토리 블로그</li></a>
                                    <a href="https://portfolio.hyns.co.kr/projects"><li class="border border-0 list-group-item rounded-0 bi bi-file-text">&nbsp;포트폴리오</li></a>
                                </div>
                            </div>
                        </ul>
                        <div class="w-50 d-flex flex-column justify-content-start gap-3">
                            <div class="profile-contact text-start border border-1 p-3">
                                <ul class="list-group h-auto rounded-0 justify-content-between w-50">
                                    <span><i class="bi bi-file-text"></i> Contact</span>
                                    <div class="icon-section">
                                        <div class="icon-section-common d-flex flex-column text-start">
                                            <a href="mailto:gumyoincirno@gmail.com">
                                                <li class="border border-0 list-group-item rounded-0 bi bi-envelope">&nbsp;메일</li>
                                            </a>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                            <div class="profile-contact text-start border border-1 p-3">
                                <ul class="list-group h-auto rounded-0 justify-content-start w-50">
                                    <span><i class="bi bi-calendar"></i> Last update</span>
                                    <div class="icon-section">
                                        <div class="icon-section-common d-flex flex-column text-start">
                                                <li class="border border-0 list-group-item rounded-0 bi bi-lightbulb">&nbsp;2022-12-10</li>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stack border border-1 py-3 px-4 py-1 boxsha">
            <div class="stack-header mb-2"><i class="bi bi-stack"></i> Main Stack</div>
            <div class="stack-element px-2">
                <MainStack v-for="i in 3" :key="i" :which="i" class="mb-2"></MainStack>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import MainStack from "./StackComponenet/MainStack.vue";
</script>
<style lang="sass" scoped>
    @import "Introduce.sass"
</style>
