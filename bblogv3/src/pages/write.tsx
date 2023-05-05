import { requestAddArticle, uploadImage } from "@/ajax/ajax";
import DelTags from "@/component/article/deletableTags";
import useInput from "@/hooks/useInput";
import { AppDispatch } from "@/store/store";
import { Button, Flex, Input, Menu, MenuButton, MenuItem, MenuList, Select, Tab, TabList, Tabs, Text, useToast } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import { Highlight } from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { t } from "i18next";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { useDispatch } from "react-redux";
const Write = () => {
    const OptionsText = ["INTRO", "DEV", "ETC", "PORTFOLIO"];
    const imgBox = useRef<HTMLInputElement>(null);
    const [hide, hideOnChange, setHide] = useInput();
    const [title, titleOnChange, setTitle] = useInput();
    const [taglist, setTagList] = useState<string[]>([]);
    const [start, startOnChange, setStart] = useInput();
    const [end, endOnChange, setEnd] = useInput();
    const [github, githubOnChange, setGithub] = useInput();
    const [published, publishedOnChange, setPublished] = useInput();
    const [thumbnail, setThumbtail] = useState<string>("");
    const [tag, onChangeTag, setTag] = useInput();
    const [tab, setTab] = useState<number>(0);
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const toast = useToast();
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
                placeholder: t('context')!,
            }),
        ],
        content: "",
    });

    if (!editor) {
        return null;
    }

    const imgUpload = (e: ChangeEvent<HTMLInputElement>) => {
        let formData = new FormData();
        if (e.target.files) {
            formData.append("upload", e.target.files[0]);
            dispatch(uploadImage(formData)).then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    toast({
                        title: t("image_upload_success"),
                        isClosable: false,
                        variant: "subtle",
                        status: "success",
                    });
                    setThumbtail(`https://hyns.dev/v1/image/` + res.payload);
                    editor
                        .chain()
                        .focus()
                        .setImage({ src: `https://hyns.dev/v1/image/` + res.payload, alt: "bblog img" })
                        .run();
                } else {
                    toast({
                        title: t("unknownError"),
                        isClosable: false,
                        variant: "subtle",
                        status: "error",
                    });
                }
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

    const delTags = (tag: string) => {
        setTagList(() => [...taglist].filter((v) => v != tag));
    };

    const setFilteredTag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            if (tag.trim().length == 0) {
                setTag("");
                return;
            }
            if (tag.length > 30) {
                toast({
                    title: t("thirty_character"),
                    isClosable: false,
                    variant: "subtle",
                    status: "warning",
                });
                setTag("");
                return;
            }

            if (taglist.includes(tag)) {
                toast({
                    title: t("already_registered"),
                    isClosable: false,
                    variant: "subtle",
                    status: "warning",
                });
                setTag("");
                return;
            }
            const madeTag = tag
                .split("")
                .filter((v: string) => v != ",")
                .join("");
            setTagList(() => [...taglist, madeTag]);
            setTag("");
        }
    };

    const writeArticle = () => {
        dispatch(
            requestAddArticle({
                context: editor.getHTML(),
                hide: hide?0:1,
                tags: taglist,
                menu: OptionsText[tab],
                title: title,
                startDate: start,
                endDate: end,
                github: github,
                publish: published,
                thumbnail: thumbnail,
            })
        )
            .then((res) => {
                if (res.meta.requestStatus === "fulfilled") {
                    tab === 3 ? router.push("/portfolio/" + res.payload) : router.push("/blog/" + res.payload);
                }
            })
            .catch((res) => {
                toast({
                    title: res.error.code + t("request_fail"),
                    isClosable: false,
                    variant: "subtle",
                    status: "error",
                });
            });
    };

    return (
        <Flex w="full" direction={"column"} gap={2}>
            <Tabs onChange={(idx) => setTab(idx)} w="fit-content">
                <TabList border="0">
                    {OptionsText.map((val, idx) => (
                        <Tab key={idx}>{val}</Tab>
                    ))}
                </TabList>
            </Tabs>
            <form className="p-0 m-0">
                <Input value={title} onChange={titleOnChange} className="custom-input2" borderWidth={1} type="text" p="2" h={"3.5rem"} />
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
            <form className="invisible w-0 h-0">
                <input type="file" ref={imgBox} id="img" className="invisible w-0 h-0" onChange={(e) => imgUpload(e)} />
            </form>

            <section className="tag w-full h-full">
                <div className="p-3 bg-slate-300 dark:bg-slate-500 flex flex-wrap gap-3 items-center">
                    <Icon icon="mdi:tag" className="translate-y-[0.125rem]" />
                    <DelTags tags={taglist} delTags={delTags} />
                    <form
                        className="taginput flex items-center translate-y-[0.1rem]"
                        onSubmit={(e) => {
                            e.preventDefault();
                        }}
                    >
                        <label htmlFor="tagInput" className="-translate-y-[1px]">
                            <Icon icon="mdi:pencil" className="translate-y-[0.1rem]" />
                        </label>
                        <input id="tagInput" type="text" placeholder={t("enter_tag")!} value={tag} onKeyDown={(e) => setFilteredTag(e)} onChange={onChangeTag} className="h-7 bg-transparent outline-none border-0 focus:ring-transparent shadow-none px-1" />
                    </form>
                </div>
            </section>
            {tab === 3 && (
                <Flex flexDirection={"column"} gap={2}>
                    <Flex alignItems={"center"} gap={5} width={"50%"}>
                        <Input size="sm" borderRadius={0} type="date" value={start} onChange={startOnChange} />
                        <Text>~</Text>
                        <Input size="sm" borderRadius={0} type="date" value={end} onChange={endOnChange} />
                    </Flex>
                    <Input size="sm" placeholder={t('github')!} borderRadius={0} type="text" value={github} onChange={githubOnChange} width={"50%"} />
                    <Input size="sm" placeholder={t('publish')!} borderRadius={0} type="text" value={published} onChange={publishedOnChange} width={"50%"} />
                </Flex>
            )}

            <Flex gap={2} justifyContent={"flex-end"}>
                <Select placeholder={t('hide_true')+" "+t('hide_false')} padding={0} borderRadius={0} borderColor={"transparent"} value={hide} onChange={hideOnChange} width={"30%"} maxW={"130px"}>
                    <option value="0">{t('hide_false')}</option>
                    <option value="1">{t('hide_true')}</option>
                </Select>
                <Button borderWidth={1} borderRadius={0} onClick={writeArticle}>
                    {t('write_submit')}
                </Button>
            </Flex>
        </Flex>
    );
};

export default Write;
