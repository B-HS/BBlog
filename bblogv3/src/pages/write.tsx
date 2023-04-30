import { uploadImage } from "@/ajax/ajax";
import useInput from "@/hooks/useInput";
import { AppDispatch } from "@/store/store";
import { Flex, Input, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Highlight } from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useRouter } from "next/router";
import { ChangeEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Icon } from "@iconify/react";
const Write = () => {
    const router = useRouter();
    const OptionsText = ["INTRO", "FRONTEND", "BACKEND", "ETC", "PORTFOLIO"];
    const imgBox = useRef<HTMLInputElement>(null);
    const [hash, hashOnChange, setHash] = useInput();
    const [options, optionsOnChange, setOptions] = useInput();
    const [hide, hideOnChange, setHide] = useInput();
    const [title, titleOnChange, setTitle] = useInput();
    const [taglist, setTagList] = useState<string[]>([]);
    const [start, startOnChange, setStart] = useInput();
    const [end, endOnChange, setEnd] = useInput();
    const [github, githubOnChange, setGithub] = useInput();
    const [published, publishedOnChange, setPublished] = useInput();
    const [uploadedImg, setUploadedImg] = useState<string[]>([]);
    const [thumbnail, setThumbtail] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Image.configure({
                inline: true,
            }),
            Highlight.configure({ multicolor: true }),
            Link.configure({
                autolink: true,
                openOnClick: true,
                linkOnPaste: true,
            }),
            Placeholder.configure({
                placeholder: "내용",
            }),
        ],
        content: "",
    });

    if (!editor) {
        return null;
    }

    const imgUpload = (e:ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();
        if (e.target.files) {
            formData.append("upload", e.target.files[0]);
            dispatch(uploadImage(formData)).then((res) => {
                setThumbtail(`https://hyns.dev/v1/image/` + res);
                editor
                    .chain()
                    .focus()
                    .setImage({ src: `/v1/image/` + res, alt: "bblog img" })
                    .run();
            });
        }
    };

    const alignment = (which: string) => {
        editor.chain().focus().setTextAlign(which).run();
    };
    const bold = () => {
        editor.chain().focus().toggleBold().run();
    };
    const strike = () => {
        editor.chain().focus().toggleStrike().run();
    };
    const bullet = () => {
        editor.chain().focus().toggleBulletList().run();
    };
    const orderlist = () => {
        editor.chain().focus().toggleOrderedList().run();
    };
    const codeblock = () => {
        editor.chain().focus().toggleCodeBlock().run();
    };
    const clearAll = () => {
        editor.chain().focus().clearNodes().run();
        editor.chain().focus().unsetAllMarks().run();
        editor.chain().focus().unsetTextAlign().run();
    };
    const redo = () => {
        editor.chain().focus().redo().run();
    };
    const undo = () => {
        editor.chain().focus().undo().run();
    };

    const highlight = () => {
        editor?.chain().focus().toggleHighlight().run();
    };

    const heading = (i: number) => {
        switch (i) {
            case 0:
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                return;
            case 1:
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                return;
            case 2:
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                return;
            case 3:
                editor.chain().focus().toggleHeading({ level: 4 }).run();
                return;
            default:
                break;
        }
    };

    return (
        <Flex w="full" direction={"column"} gap={2}>
            <form className="p-0 m-0">
                <Input className="custom-input2" borderWidth={1} type="text" p="2" h={"3.5rem"} />
            </form>
            <Flex className="text-3xl custom-input2 p-3" justify={"space-between"}>
                <Icon icon="mdi:undo" onClick={() => undo()} />
                <Icon icon="mdi:redo" onClick={() => redo()} />
                <Menu>
                    <MenuButton>
                        <Icon icon="bx:heading" />
                    </MenuButton>
                    <MenuList borderWidth={0} minW={"30px"} p={0}>
                        {Array.from({ length: 3 }).map((v, index) => {
                            return (
                                <MenuItem key={index} onClick={() => heading(index)}>
                                    H{index + 1}
                                </MenuItem>
                            );
                        })}
                    </MenuList>
                </Menu>
                <Icon icon="ri:underline" onClick={() => highlight()} />
                <Icon icon="material-symbols:format-bold" onClick={() => bold()} />
                <Icon icon="gg:format-strike" onClick={() => strike()} />
                <Icon icon="bx:list-ul" onClick={() => bullet()} />
                <Icon icon="bx:list-ol" onClick={() => orderlist} />
                <Icon icon="material-symbols:format-align-left" onClick={() => alignment("left")} />
                <Icon icon="material-symbols:format-align-center" onClick={() => alignment("center")} />
                <Icon icon="material-symbols:format-align-right" onClick={() => alignment("right")} />
                <Icon icon="material-symbols:code-rounded" onClick={() => codeblock()} />
                <Icon icon="ph:eraser-duotone" onClick={() => clearAll()} />

                <Icon icon="material-symbols:image-outline-sharp" onClick={() => imgBox.current?.click()} />
            </Flex>

            <section className="custom-input2">
                <EditorContent className="p-3" editor={editor} />
            </section>
            <form>
                <input type="file" ref={imgBox} id="img" className="invisible w-0 h-0" onChange={(e)=>imgUpload(e)} />
            </form>
        </Flex>
    );
};

export default Write;
