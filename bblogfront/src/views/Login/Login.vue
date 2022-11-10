<template>
    <div class="loginpage d-flex justify-content-center align-items-center">
        <div class="loginbox p-3 d-flex justify-content-start align-items-center flex-column">
            <h2 class="mt-3 pt-3">Login</h2>
            <div class="inputarea d-flex flex-column gap-3 w-75 mt-3">
                <input type="text" placeholder="아이디" class="w-100 p-2">
                <input type="text" placeholder="비밀번호" class="w-100 p-2">
                <button class="btn border border-1 rounded-0 p-2"> Login</button>
            </div>
            <div class="btnarea d-flex justify-content-between w-75">
                <button class="btn px-0 py-3 text-nowrap">회원가입</button>
                <button class="btn px-0 py-3 text-nowrap">계정 찾기</button>
            </div>
            <hr class="w-75">
            <div class="socialarea d-flex justify-content-center w-75 gap-5">
                <i class="bi bi-google py-3"></i>
                <i class="bi bi-github py-3"></i>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style lang="sass" scoped>
    @import "Login.sass"
</style>
