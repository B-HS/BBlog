<template>
    <div class="layout h-100">
        <header class="sticky-top">
            <Header></Header>
        </header>
        <transition>
            <router-view class="w-100 h-100"></router-view>
        </transition>
    </div>
</template>

<script setup lang="ts">
    import Header from "./components/Header/Header.vue";
</script>

<style lang="sass">
    a
        text-decoration: none !important
        color: inherit !important
    body
        height: 100vh
        min-width: 1024px
        
        &::-webkit-scrollbar
            display: none

    input
        border: 1px solid black
        &:focus, &:active
            outline: 0

            
    .w-5
        width: 5% !important
    .w-15
        width: 15% !important
    .w-10
        width: 10% !important
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
