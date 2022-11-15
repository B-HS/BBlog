<template>
    <div class="layout h-100 d-flex justify-content-center flex-column">
        <header class="sticky-top">
            <Header w-100></Header>
        </header>
        <transition>
            <router-view class="w-100 h-100 routersection"></router-view>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import Header from "./components/Header/Header.vue";
</script>

<style lang="sass">
    .btn,
    input,
    textarea,
    select,
    button,
    a
        background-color: inherit
        border-radius: 0 !important
    a
        text-decoration: none !important
        color: inherit !important
    body
        height: 100vh
        min-width: 1280px
        
        &::-webkit-scrollbar
            display: none

    input,select
        border: 1px solid black
        &:focus, &:active
            outline: 0

    .routersection
        max-width: 1920px

    .form-select, input,a,.page-item
        &:focus
            box-shadow: none !important
    .w-5
        width: 5% !important
    .w-15
        width: 15% !important
    .w-10
        width: 10% !important
    .w-33
        width: 33% !important
    .w-90
        width: 90% !important
    .w-95
        width: 95% !important             
    .h-15
        height: 15% !important
    .h-10
        height: 10% !important
    .h-85
        height: 85% !important
    .layout
        header
            z-index: 1100
    .menubar
        min-width: 200px
    .v-enter-active, .v-leave-active
        transition: 0.5s ease-in-out all
    .v-enter-from, .v-leave-to
        opacity: 0
    ul
        position: relative
    li
        cursor: pointer
</style>
