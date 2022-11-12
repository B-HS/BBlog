<template>
    <div class="adminarticle border d-flex flex-column align-items-center p-5">
        <table class="table table-hover text-center">
            <thead>
                <tr>
                    <th colspan="1">회원번호</th>
                    <th colspan="15">회원이름</th>
                    <th colspan="5">가입일</th>
                    <th colspan="5">관리</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="i in 10" :key="i">
                    <td colspan="1">{{i}}</td>
                    <td colspan="15">사용자{{i}}</td>
                    <td colspan="5">2022-02-02</td>
                    <td colspan="5" class="d-flex gap-2 justify-content-center">
                        <button class="btn btn-warning">수정</button>
                        <button class="btn btn-danger">삭제</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
                <li class="page-item disabled">
                    <a class="page-link">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                    <a class="page-link" href="#">Next</a>
                </li>
            </ul>
        </nav>
    </div>
</template>
<script setup lang="ts">

</script>
<style lang="sass">
    @import 'AdminUser.sass'
</style>