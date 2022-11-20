<template>
    <div class="mainstack border border-1">
        <button class="btn w-100 text-nowrap text-start d-flex justify-content-between" type="button" data-bs-toggle="collapse" :data-bs-target="`#stack${props.info.sid}`" aria-expanded="false" aria-controls="stack"><span> - {{ props.info.title }}</span> <i class="bi bi-caret-down"></i></button>
        <div class="collapse border-top" :id="`stack${props.info.sid}`">
            <div class="card card-body border border-0" v-html="props.info.context"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        info: { type:Object, required: true },
    });
    
</script>
<style lang="sass">
    @import "MainStack.sass"
</style>
