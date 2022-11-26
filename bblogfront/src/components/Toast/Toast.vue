<template>
        <div class="toast-container position-fixed bottom-0 end-0 p-3">
            <div id="toast" ref="toast" class="toast rounded-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="toast-header">
                    <img src="https://lh3.googleusercontent.com/a/ALm5wu2Ak_WI_tYwI9rCHT_Axh4HHvygPT2gId20gL7x9w=s96-c" class="rounded me-2" />
                    <strong class="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div class="toast-body">Hello, world! This is a toast message.</div>
            </div>
        </div>
</template>
<script setup lang="ts">

</script>
<style lang="sass">
    @import "Toast.sass"
</style>
