<template>
    <div class="mainstack border border-1">
        <button class="btn w-100 text-nowrap text-start d-flex justify-content-between" type="button" data-bs-toggle="collapse" :data-bs-target="`#stack${props.which}`" aria-expanded="false" aria-controls="stack"><span> - {{ which }}</span> <i class="bi bi-caret-down"></i></button>
        <div class="collapse border-top" :id="`stack${props.which}`">
            <div class="card card-body border border-0">Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.</div>
        </div>
    </div>
</template>
<script setup lang="ts">
    const props = defineProps({
        which: { type: Number, required: true },
    });
</script>
<style lang="sass">
    @import "MainStack.sass"
</style>
