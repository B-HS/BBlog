<template>
    <div class="px-5 mt-3 mb-5 d-flex flex-column gap-5">
        <div class="profile d-flex flex-column border border-1 p-3 align-items-start boxsha">
            <div class="profile-header"><i class="bi bi-person-fill p-1"></i>Introduce</div>
            <div class="profile-context d-flex w-100">
                <div class="profile-img w-25 d-flex align-items-center p-3">
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
                                    <a href="https://hbyun.tistory.com"><li class="border border-0 list-group-item rounded-0 bi bi-bootstrap">&nbsp;티스토리 블로그</li></a>
                                    <a href="https://portfolio.hyns.co.kr/projects"><li class="border border-0 list-group-item rounded-0 bi bi-file-text">&nbsp;포트폴리오</li></a>
                                </div>
                            </div>
                        </ul>
                        <div class="w-50 d-flex flex-column justify-content-start gap-3">
                            <div class="profile-contact text-start border border-1 p-3">
                                <ul class="list-group h-auto rounded-0 justify-content-between w-100">
                                    <span><i class="bi bi-file-text"></i> Contact</span>
                                    <div class="icon-section">
                                        <div class="icon-section-common d-flex flex-column text-start">
                                            <a href="mailto:gumyoincirno@gmail.com">
                                                <li class="border border-0 list-group-item rounded-0 bi bi-envelope">&nbsp;메일</li>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="icon-section">
                                        <div class="icon-section-common d-flex flex-column text-start">
                                            <a href="https://discord.gg/f9GmFV9MdM">
                                                <li class="border border-0 list-group-item rounded-0 bi bi-discord">&nbsp;디스코드</li>
                                            </a>
                                        </div>
                                    </div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="stack border border-1 py-3 px-4 py-1 boxsha position-relative">
            <div class="stack-header mb-2"><i class="bi bi-stack"></i> Main Stack</div>
            <div class="editstack position-absolute d-flex gap-3">
                <i class="bi bi-plus-square" v-if="!sortboxDisabled" data-bs-toggle="modal" data-bs-target="#addStack"> 스택 추가</i>
                <i class="bi bi-pencil" v-if="userStore.getIsAdmin" @click.prevent="enableSortboxOption">{{ ` ${sortboxDisabled ? "" : "수정 취소"}` }}</i>
                <i class="bi bi-check-square" v-if="!sortboxDisabled" @click="saveCurrentStackStatus"> 현재상태 저장하기</i>
            </div>

            <Sortable :list="stack" item-key="idx" :options="options" class="stack-element px-2" @sort="orderChange">
                <template #item="{ element, index }">
                    <div class="draggable position-relative" :key="element.idx">
                        <MainStack class="mb-2" :info="element" :key="element.idx"></MainStack>
                        <i class="deletebtn bi bi-x-square-fill position-absolute" v-if="!sortboxDisabled" @click="elementDelete(index)"></i>
                        <i class="modifybtn bi bi-pencil position-absolute" v-if="!sortboxDisabled" @click="setIdx(element.sid)" data-bs-toggle="modal" data-bs-target="#modifyStack"></i>
                    </div>
                </template>
            </Sortable>
        </div>
        <div class="modal fade" id="addStack" tabindex="-1" aria-labelledby="addStackLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addStackLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text rounded-0">제목</span>
                            <input type="text" class="form-control rounded-0" aria-label="title" v-model="addStackInfo.title" />
                        </div>
                        <div class="input-group">
                            <span class="input-group-text rounded-0 w-100 d-flex justify-content-center bg-white">내용</span>
                            <editor-content :editor="editor" class="rounded-0 m-0 w-100 border p-2" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="addStack">추가하기</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="modifyStack" tabindex="-1" aria-labelledby="modifyStackLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="modifyStackLabel">Modal title</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <span class="input-group-text rounded-0">제목</span>
                            <input type="text" class="form-control rounded-0" aria-label="title" v-model="modifyStack.title" />
                        </div>
                        <div class="input-group">
                            <span class="input-group-text rounded-0 w-100 d-flex justify-content-center bg-white">내용</span>
                            <editor-content :editor="editor2" class="rounded-0 m-0 w-100 border p-2" />
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click.prevent="modifyStackInfo">수정하기</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { useBlogStore } from "@/store/blogStore";
    import { useEditor, EditorContent } from "@tiptap/vue-3";
    import type { SortableEvent, SortableOptions } from "sortablejs";
    import { Sortable } from "sortablejs-vue3";
    import { computed, onMounted, reactive, ref } from "vue";
    import Link from "@tiptap/extension-link";
    import StarterKit from "@tiptap/starter-kit";
    import MainStack from "./StackComponenet/MainStack.vue";
    import { useUserStore } from "@/store/userStore";

    const store = useBlogStore();
    const userStore = useUserStore()
    const sortboxDisabled = ref<boolean>(true);
    const latestModifyDate = ref<string>("");
    const latestsid = ref<number>(3);
    const deleteStack = ref<number[]>([]);
    const stack = reactive<stackset[]>([]);

    const editor = useEditor({
        content: "",
        extensions: [
            StarterKit,
            Link.configure({
                autolink: true,
                openOnClick: true,
                linkOnPaste: true,
            }),
        ],
    });

    const editor2 = useEditor({
        content: "",
        extensions: [
            StarterKit,
            Link.configure({
                autolink: true,
                openOnClick: true,
                linkOnPaste: true,
            }),
        ],
    });
    const modifyStack = reactive<{ title: string; context: string; idx: number }>({
        title: "",
        context: "",
        idx: -1,
    });

    const addStackInfo = reactive<{ title: string; context: string; sid: number }>({
        title: "",
        context: "",
        sid: latestsid.value,
    });

    const enableSortboxOption = () => {
        sortboxDisabled.value ? (sortboxDisabled.value = false) : (sortboxDisabled.value = true);
    };
    const addStack = () => {
        stack.push({ sid: addStackInfo.sid, title: addStackInfo.title, context: editor.value?.getHTML() as string, idx: stack.length, new: true });
        latestsid.value += 1;
        addStackInfo.title = "";
        addStackInfo.context = "";
        addStackInfo.sid = latestsid.value;
        editor.value?.commands.clearContent();
    };

    const elementDelete = (idx: number) => {
        if (!stack[idx].new) {
            deleteStack.value.push(stack[idx].sid);
        }
        stack.splice(idx, 1);
        stack.forEach((v, index) => {
            v.idx = index;
        });
    };

    const options = computed<SortableOptions>(() => {
        return {
            draggable: ".draggable",
            animation: 150,
            ghostClass: "ghost",
            dragClass: "drag",
            disabled: sortboxDisabled.value,
        };
    });
    const orderChange = (evt: SortableEvent) => {
        moveItemInArray(stack as stackset[], evt.oldIndex as number, evt.newIndex as number);
    };

    const moveItemInArray = (array: stackset[], from: number, to: number) => {
        const item: stackset = array.splice(from, 1)[0];
        array.splice(to, 0, item);
    };

    const setIdx = (sid: number) => {
        stack.forEach((v) => {
            if (v.sid == sid) {
                modifyStack.idx = v.idx;
                modifyStack.title = v.title;
                editor2.value?.chain().setContent(v.context).run();
            }
        });
    };

    const modifyStackInfo = () => {
        stack[modifyStack.idx].title = modifyStack.title;
        stack[modifyStack.idx].context = editor2.value?.getHTML() as string;
        editor2.value?.commands.clearContent();
        modifyStack.idx = -1;
        modifyStack.title = "";
        modifyStack.context = "";
    };

    const saveCurrentStackStatus = async() => {
        await store.stackInfoModifyingRequest(stack, deleteStack.value);
        stack.splice(0)
        getStackInformation()
    };

    const getStackInformation = ()=>{
        store.StackInfoRequest().then(res=>{
            res.data.forEach((v:stackset)=>{
                stack.push(v)
            })
        })
    }
    getStackInformation()
    onMounted(() => {
        latestModifyDate.value = store.getLatestModifyDate;
    });
</script>
<style lang="sass" scoped>
    @import "Introduce.sass"
</style>
