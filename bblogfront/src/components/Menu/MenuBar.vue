<template>
    <div class="offcanvas offcanvas-start py-0" tabindex="-1" id="menubar" aria-labelledby="menubarLabel">
        <div class="offcanvas-header fs-5 p-2 pb-0 px-2 align-items-center justify-content-center">
            <i class="bi bi-x-lg btn-close cursorp" data-bs-dismiss="offcanvas" aria-label="Close"></i>
        </div>
        <div class="offcanvas-body p-0 pt-3 m-0 d-flex flex-column">
            <span class="px-4">Menu</span>
            <ul class="list-group p-0 m-0">
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5"><a href="#">메뉴 더미1</a></li>
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5"><a href="#">메뉴 더미2</a></li>
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5"><a href="#">메뉴 더미3</a></li>
            </ul>
            <hr>
            <span class="px-4">Recent Articles</span>
            <ul class="list-group p-0 m-0">
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5"><a href="#">게시글 더미1</a></li>
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5"><a href="#">게시글 더미2</a></li>
                <li class="list-group-item bg-transparent text-white rounded-0 text-start ps-5"><a href="#">게시글 더미3</a></li>
            </ul>
            <hr>
            <span class="px-4">Counter</span>
            <span class="px-5"> Today : 1</span>
            <span class="px-5"> Total : 1</span>
        </div>
    </div>
</template>
<script setup lang="ts"></script>
<style lang="sass" scoped>
    @import "MenuBar.sass"
</style>
