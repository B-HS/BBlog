import { Badge, Button, CircularProgress, Flex, Input, Menu, MenuButton, MenuItem, MenuList, Select, Stack, Text, useToast, UseToastOptions } from "@chakra-ui/react";
import { Highlight } from "@tiptap/extension-highlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { KeyboardEvent, useEffect, useRef, useState } from "react";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight, BiBold, BiBrushAlt, BiCodeAlt, BiHeading, BiImage, BiListOl, BiListUl, BiPurchaseTag, BiRedo, BiStrikethrough, BiUnderline, BiUndo } from "react-icons/bi";
import { getCookie } from "typescript-cookie";
import useInput from "../Hook/useInput";
import { getTagerArticleInformaiton, imgUpload, modifyRequest, write } from "../Store/Async/articleAsync";
import { OUTER_LINK } from "../Store/Async/axiosConfig/URL";
import { adminChecker } from "../Store/Async/memberAsync";
import { clearArticleDetail } from "../Store/Slice/articleSlice";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { articleInfo } from "../Typings/type";

const Write = () => {
    const dispatch = useAppDispatch();
    const { articleDetail } = useAppSelector((state) => state.article);
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
    const { imgName, Loading } = useAppSelector((state) => state.article);
    const toast = useToast();
    const toastOptions = (desc: string) => {
        return {
            description: desc,
            position: "top",
            status: "error",
            duration: 3000,
            isClosable: true,
        };
    };

    const { aid } = router.query;

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
        content: articleDetail ? articleDetail.context : "",
    });
    useEffect(() => {
        const access = getCookie("access");
        const refresh = getCookie("refresh");

        dispatch(adminChecker({ refresh: refresh, access: access })).then((res) => {
            if (!res.payload) {
                router.push("/login");
            }
        });

        if (aid) {
            dispatch(
                getTagerArticleInformaiton({
                    access: access,
                    refresh: refresh,
                    aid: Number.parseInt(aid as string),
                })
            ).then((res) => {
                setOptions(OptionsText.findIndex((v) => v == articleDetail.menu));
                setTitle(articleDetail.title);
                setTagList((v) => [...v, ...articleDetail.hashtag]);
                setHide(articleDetail.hide ? 1 : 0);
                setUploadedImg((v) => [...v, ...res.payload.imgs]);
                setGithub(articleDetail.github);
                setPublished(articleDetail.published);
                setStart(dayjs(articleDetail.start).format("YYYY-MM-DD"));
                setEnd(dayjs(articleDetail.end).format("YYYY-MM-DD"));
            });
        }

        return () => {
            dispatch(clearArticleDetail());
        };
    }, []);

    if (!editor) {
        return null;
    }

    const imageUpload = () => {
        let formData = new FormData();
        if (imgBox.current && imgBox.current.files) {
            for (let i = 0; i < imgBox.current.files.length; i++) {
                const element = imgBox.current.files[i];
                formData.append("files", element);
            }
            dispatch(imgUpload({ data: formData, access: getCookie("access"), refresh: getCookie("refresh") })).then((res) => {
                for (let i = 0; i < res.payload.length; i++) {
                    const element = res.payload[i];
                    editor
                        .chain()
                        .focus()
                        .setImage({ src: `${OUTER_LINK}/image/${element}`, alt: "bblog img" })
                        .run();
                }
                setUploadedImg((v) => [...v, ...res.payload]);
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

    const setHashtag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter" || e.key == ",") {
            if (hash.trim().length == 0) {
                setHash("");
                return;
            }
            if (hash.length > 35) {
                toast(toastOptions("30자 이하로 입력해주세요") as UseToastOptions);
                setHash("");
                return;
            }

            if (taglist.includes(hash)) {
                toast(toastOptions("등록된 태그입니다") as UseToastOptions);
                setHash("");
                return;
            }
            const tag = hash
                .split("")
                .filter((v: string) => v != ",")
                .join("");
            setTagList([...taglist, tag]);
            setHash("");
        }
    };

    const deleteHashTag = (val: string) => {
        setTagList([...taglist].filter((v) => v != val));
    };

    const writeArticle = () => {
        if (options.length == 0) {
            toast(toastOptions("메뉴를 선택해주세요") as UseToastOptions);
            return;
        }
        if (title.length === 0) {
            toast(toastOptions("제목을 입력해주세요") as UseToastOptions);
            return;
        }
        if (editor.getText().length === 0) {
            toast(toastOptions("내용을 입력해주세요") as UseToastOptions);
            return;
        }
        if (hide.length === 0) {
            toast(toastOptions("공개여부를 선택해주세요") as UseToastOptions);
            return;
        }

        const articleData: articleInfo = {
            aid: aid ? Number.parseInt(aid as string) : null,
            menu: OptionsText[options as unknown as number],
            title: title,
            context: editor.getHTML(),
            hashtag: taglist,
            hide: hide == "0" ? false : true,
            imgs: uploadedImg,
            github: github,
            published: published,
            access: getCookie("access"),
            refresh: getCookie("refresh"),
        };
        if (articleData.menu == "PORTFOLIO") {
            if (articleData.start?.getTime()) {
                toast(toastOptions("시작날짜를 선택해주세요") as UseToastOptions);
                return;
            }
            if (articleData.end?.getTime()) {
                toast(toastOptions("종료날짜를 선택해주세요") as UseToastOptions);
                return;
            }
            articleData.start = new Date(start);
            articleData.end = new Date(end);
        }
        if (aid) {
            dispatch(modifyRequest(articleData)).then((res) => {
                router.push(`./blog`);
            });
        } else {
            dispatch(write(articleData)).then((res) => {
                router.push(`./blog`);
            });
        }
    };
    return (
        <>
            <Head>
                <title>HS :: Wrtie</title>
                <meta name="description" content="Write page" />
                <meta name="keywords" content="Write" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Intro" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content="Blog by Hyunseok byun" />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <Stack padding={1}>
                <Select placeholder="Select option" padding={0} borderRadius={0} value={options} onChange={optionsOnChange}>
                    {OptionsText.map((v, i) => (
                        <option key={i} value={i}>
                            {v}
                        </option>
                    ))}
                </Select>
                <hr />
                <div className="write-title w-screen">
                    <input type="text" name="title" placeholder="제목" className="w-screen" value={title} onChange={titleOnChange} />
                </div>
                <hr />
                <Flex justifyContent={"space-between"} cursor={"pointer"} paddingX={"1rem"}>
                    <BiUndo onClick={() => undo()} />
                    <BiRedo onClick={() => redo()} />
                    <Menu>
                        <MenuButton>
                            <BiHeading />
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
                    <BiUnderline onClick={() => highlight()} />
                    <BiBold onClick={() => bold()} />
                    <BiStrikethrough onClick={() => strike()} />
                    <BiListUl onClick={() => bullet()} />
                    <BiListOl onClick={() => orderlist} />
                    <BiAlignLeft onClick={() => alignment("left")} />
                    <BiAlignMiddle onClick={() => alignment("center")} />
                    <BiAlignRight onClick={() => alignment("right")} />
                    <BiCodeAlt onClick={() => codeblock()} />
                    <BiBrushAlt onClick={() => clearAll()} />
                    <BiImage
                        onClick={() => {
                            imgBox.current?.click();
                        }}
                    ></BiImage>
                    <input
                        ref={imgBox}
                        type="file"
                        hidden={true}
                        multiple={true}
                        onChange={() => {
                            imageUpload();
                        }}
                    />
                </Flex>
                <hr />
                <EditorContent editor={editor} />
                <hr />
                <div className="write-hashtag w-screen">
                    <input value={hash} onChange={hashOnChange} type="text" name="title" placeholder="태그" className="w-screen" onKeyUp={(e) => setHashtag(e)} />
                </div>
                <hr />
                <Flex gap={3} flexWrap={"wrap"} className="w-100">
                    <BiPurchaseTag className="-scale-x-100" />
                    {taglist.map((v, i) => {
                        return (
                            <Flex key={i} alignItems={"center"} gap={1} maxH={"1rem"}>
                                <Badge key={i} onClick={() => deleteHashTag(v)} cursor={"pointer"}>
                                    {v} x
                                </Badge>
                            </Flex>
                        );
                    })}
                </Flex>
                <hr />
                {OptionsText[options as unknown as number] == "PORTFOLIO" && (
                    <Flex flexDirection={"column"} gap={2}>
                        <Flex alignItems={"center"} gap={5} width={"50%"}>
                            <Input size="sm" borderRadius={0} type="date" value={start} onChange={startOnChange} />
                            <Text>~</Text>
                            <Input size="sm" borderRadius={0} type="date" value={end} onChange={endOnChange} />
                        </Flex>
                        <Flex flexDirection={"column"} alignSelf={"flex-start"}>
                            <span>사진 총 {uploadedImg ? uploadedImg.length : 0}개 첨부됨</span>
                            {imgName &&
                                uploadedImg &&
                                uploadedImg.map((v, i) => (
                                    <Flex key={i} gap={3}>
                                        <span
                                            onClick={() => {
                                                const filtered = uploadedImg.filter((val) => val != v);
                                                setUploadedImg((v) => [...filtered]);
                                            }}
                                        >
                                            X {i}{" "}
                                        </span>
                                        <button key={i}>{v}</button>
                                    </Flex>
                                ))}
                        </Flex>
                        <Input size="sm" placeholder="깃허브" borderRadius={0} type="text" value={github} onChange={githubOnChange} width={"50%"} />
                        <Input size="sm" placeholder="배포 사이트" borderRadius={0} type="text" value={published} onChange={publishedOnChange} width={"50%"} />
                    </Flex>
                )}
                <Flex gap={2} justifyContent={"flex-end"}>
                    <Select placeholder="공개 설정" padding={0} borderRadius={0} value={hide} onChange={hideOnChange} width={"30%"} maxW={"110px"}>
                        <option value="0">공개</option>
                        <option value="1">비공개</option>
                    </Select>
                    <Button borderWidth={1} borderRadius={0} onClick={writeArticle}>
                        {aid ? "수정" : "등록"}
                    </Button>
                </Flex>
                {Loading && (
                    <Flex width="w-screen" justifyContent={"center"}>
                        <CircularProgress isIndeterminate color="purple.300" />
                    </Flex>
                )}
            </Stack>
        </>
    );
};

export default Write;
