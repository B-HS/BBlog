<template>
    <div class="write d-flex flex-column justify-content-center pt-5 align-items-center gap-3 h-100">
        <div class="category"></div>
        <div class="write-title w-50">
            <input type="text" name="title" v-model="articleState.title" placeholder="제목" class="w-100 h-100 p-1 px-2" />
        </div>
        <div class="editor w-50">
            <div class="editor-btns">
                <button class="bi bi-arrow-left" @click="undo" :disabled="!editor?.can().chain().focus().undo().run()"></button>
                <button class="bi bi-arrow-right" @click="redo" :disabled="!editor?.can().chain().focus().redo().run()"></button>
                <button class="bi bi-justify-left" @click="alignment('left')"></button>
                <button class="bi bi-justify" @click="alignment('center')"></button>
                <button class="bi bi-justify-right" @click="alignment('right')"></button>
                <button class="bi bi-type-bold" @click="bold"></button>
                <button class="bi bi-type-strikethrough" @click="strike"></button>
                <button class="bi bi-brightness-high" @click="highlight"></button>
                <button class="bi bi-code" @click="code"></button>
                <button class="bi bi-list-task" @click="bullet"></button>
                <button class="bi bi-list-ol" @click="orderlist"></button>
                <button class="bi bi-file-earmark-code" @click="codeblock"></button>
                <button class="bi bi-stars" @click="clearAll"></button>
            </div>
            <editor-content :editor="editor" class="editor-description" />
        </div>
        <input type="text" v-model="hashStates.tag" v-on:keyup.space="makingTag" placeholder="태그" class="p-1 px-2 w-50" />
        <div class="hashtags w-50 d-flex overflow-auto">
            <div class="tag d-flex justify-content-center align-items-center text-nowrap" v-for="(item, i) in articleState.tags" :key="item">
                <span class="m-1"># {{ item }}</span>
                <button class="delbtn d-flex justify-content-center align-items-center px-1">
                    <span v-on:click="deleteTag(i)" class="bi bi-x-lg"></span>
                </button>
            </div>
        </div>
        <div class="d-flex justify-content-end w-50">
            <ul class="list-group list-group-horizontal align-items-center gap-3">
                <li class="list-group-item border border-0 p-0">
                    <div class="tagwarning" v-html="hashStates.warning"></div>
                </li>
                <li class="list-group-item border border-0 p-0">
                    <select class="form-select form-select-sm" v-model="articleState.category" aria-label=".form-select-sm">
                        <option value="0">카테고리</option>
                        <option value="1" v-for="i in 5" :key="i">더미{{ i }}</option>
                    </select>
                </li>
                <li class="list-group-item border border-0 p-0 d-flex gap-1">
                    <select class="form-select form-select-sm" v-model="articleState.hide" aria-label=".form-select-sm">
                        <option value="0">공개</option>
                        <option value="1">비공개</option>
                    </select>
                </li>

                <li class="list-group-item border border-0 p-0">
                    <span class="border border-1 p-2 px-3 submit" @click="write">등록</span>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useEditor, EditorContent } from "@tiptap/vue-3";
    import TextAlign from "@tiptap/extension-text-align";
    import StarterKit from "@tiptap/starter-kit";
    import { Highlight } from "@tiptap/extension-highlight";
    import { reactive } from "vue";
    import axios from "axios";
import router from "@/router";

    const editor = useEditor({
        content: "",
        extensions: [
            StarterKit,
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Highlight.configure({ multicolor: true }),
        ],
    });

    const hashStates = reactive<{ warning?: string; tag?: string }>({
        warning: "",
        tag: "",
    });

    let articleState = reactive<{ title: string; tags?: string[]; category: number; hide: number }>({
        title: "",
        tags: [],
        category: 0,
        hide: 0,
    });

    const makingTag = () => {
        if (hashStates.tag?.trim().replace(/ /, "").length == 0) {
            hashStates.warning = "공백은 태그로 사용이 불가능합니다";
            hashStates.tag = "";
            return;
        }
        if (articleState.tags?.includes(hashStates.tag?.trim().replace(/ /, "") as string)) {
            hashStates.warning = "이미 등록된 태그입니다";
            hashStates.tag = "";
            return;
        }
        articleState.tags?.push(hashStates.tag?.trim().replace(/ /, "") as string);
        console.log(articleState.tags);
        hashStates.warning = "";
        hashStates.tag = "";
    };

    const deleteTag = (i: number) => {
        articleState.tags?.splice(i, 1);
    };

    const alignment = (which: string) => {
        editor.value?.chain().focus().setTextAlign(which).run();
    };

    const bold = () => {
        editor.value?.chain().focus().toggleBold().run();
    };

    const strike = () => {
        editor.value?.chain().focus().toggleStrike().run();
    };

    const code = () => {
        editor.value?.chain().focus().toggleCode().run();
    };

    const bullet = () => {
        editor.value?.chain().focus().toggleBulletList().run();
    };

    const orderlist = () => {
        editor.value?.chain().focus().toggleOrderedList().run();
    };

    const codeblock = () => {
        editor.value?.chain().focus().toggleCodeBlock().run();
    };

    const clearAll = () => {
        editor.value?.chain().focus().clearNodes().run();
        editor.value?.chain().focus().unsetAllMarks().run();
        editor.value?.chain().focus().unsetTextAlign().run();
    };

    const redo = () => {
        editor.value?.chain().focus().redo().run();
    };

    const undo = () => {
        editor.value?.chain().focus().undo().run();
    };

    const highlight = () => {
        editor.value?.chain().focus().toggleHighlight().run();
    };

    const write = () => {
        if (articleState.category === 0) {
            hashStates.warning = "카테고리를 선택하세요";
            return;
        }
        if (editor.value?.getText().trim().length === 0) {
            hashStates.warning = "본문을 입력하세요";
            return;
        }
        const articlebody: { title: string; context: string | undefined; tags?: string[]; category: number; hide: boolean; menuid:number } = {
            title: articleState.title,
            context: editor.value?.getHTML(),
            tags: JSON.parse(JSON.stringify(articleState.tags)),
            category: articleState.category,
            hide: articleState.hide===0?false:true,
            menuid: articleState.category
        };
        axios.post("/article/admin/write", articlebody).then(res=>router.push(`./read?id=${res.data}`))
    };
</script>
<style lang="sass">
    @import "Write.sass"
</style>
