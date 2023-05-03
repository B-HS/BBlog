import { requestEditArticle } from "@/ajax/ajax";
import { article } from "@/app";
import useInput from "@/hooks/useInput";
import { AppDispatch } from "@/store/store";
import { Icon } from "@iconify/react";
import { t } from "i18next";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import DelTags from "../article/deletableTags";
import { useToast } from "@chakra-ui/react";

const ArticleModify = ({ article, showModal, setShowModal }: { article: article; showModal: boolean; setShowModal: Function }) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const modifiedArticle = useRef<article>(article);
    const [title, onChangeTitle, setTitle] = useInput(article.title);
    const [html, onChangeHtml, setHtml] = useInput(article.context);
    const [tags, setTags] = useState<string[]>(article.tags);
    const [hashInput, onChangeHashInput, setHashInput] = useInput();
    const [tab, setTab] = useState<boolean>(false);
    const toast = useToast();
    const enterHandler = (e: KeyboardEvent) => {
        if (e.code === "Enter") {
            setHtml(html + "</br>");
        }
    };

    const deleteHashTag = (val: string) => setTags([...tags].filter((v) => v != val));

    const validator = () => {
        if (!title || title.trim().length === 0) {
            toast({
                title: t("write_no_title"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return false;
        }
        if (!html || html.trim().length === 0) {
            toast({
                title: t("write_no_desc"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return false;
        }
        return true;
    };
    const modify = async () => {
        if (validator()) {
            modifiedArticle.current.title = title;
            modifiedArticle.current.context = html;
            modifiedArticle.current.tags = tags;
            dispatch(requestEditArticle(modifiedArticle.current)).then(() => {
                window.location.reload();
            });
        }
    };

    const setHashtag = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            if (hashInput.trim().length == 0) {
                setHashInput("");
                return;
            }
            if (hashInput.length > 35) {
                toast({
                    title: t("thirty_character"),
                    isClosable: false,
                    variant: "subtle",
                    status: "warning",
                });
                setHashInput("");
                return;
            }

            if (tags.includes(hashInput)) {
                toast({
                    title: t("already_registered"),
                    isClosable: false,
                    variant: "subtle",
                    status: "warning",
                });
                setHashInput("");
                return;
            }
            const tag = hashInput
                .split("")
                .filter((v: string) => v != ",")
                .join("");
            setTags([...tags, tag]);
            setHashInput("");
        }
    };

    useEffect(() => {
        if (showModal) dialog.current?.showModal();
        if (!showModal) dialog.current?.close();
    }, [showModal]);

    return (
        <dialog ref={dialog} onClose={() => setShowModal(false)} className="w-[50%] h-fit min-w-[385px] py-5 card shadow-xl">
            <div className="flex flex-col gap-2 min-w-[350px] justify-between h-full">
                <section className="m-header border-b border-black dark:border-slate-500 py-2 px-1 h-[7%] dark:text-white">
                    <span className="text-2xl">{t("article_modify")}</span>
                </section>
                <section className="tags reply_add flex border-gray-600 dark:text-white">
                    <section className="flex z-[999] items-center h-full">
                        <DelTags delTags={deleteHashTag} tags={tags} />
                        <form className="taginput flex items-center translate-y-[0.1rem] mb-1" onSubmit={(e) => e.preventDefault()}>
                            <label htmlFor="tagInput" className="-translate-y-[1px]">
                                <Icon icon="mdi:pencil" className="translate-y-[0.1rem]" />
                            </label>
                            <input id="tagInput" type="text" placeholder={t("enter_tag")!} onChange={onChangeHashInput} value={hashInput} className="h-7 bg-transparent outline-none border-0 focus:ring-transparent shadow-none px-1" onKeyDown={(e) => setHashtag(e)} />
                        </form>
                    </section>
                </section>

                <form className="m-body flex flex-col gap-2 h-[80%] relative mb-[30px] dark:text-white" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" onChange={onChangeTitle} value={title} className="input border-none h-[2.75rem]" />
                    <section className="m-body_context h-full">
                        {tab && <textarea onKeyDown={(e) => enterHandler(e)} onChange={onChangeHtml} value={html} className="textarea border-none min-h-[385px] h-full rounded-none resize-none" />}

                        {!tab && <div dangerouslySetInnerHTML={{ __html: html }}></div>}
                    </section>
                    <section className="absolute -bottom-[29px] right-[0.1px] flex">
                        <button className="btn btn-sm p-1 border-b rounded-none" onClick={() => setTab(true)}>
                            HTML
                        </button>
                        <button className="btn btn-sm p-1 border-b rounded-none" onClick={() => setTab(false)}>
                            Preview
                        </button>
                    </section>
                </form>
                <section className="m-footer w-full flex justify-end h-[5%] gap-3">
                    <button className="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100" onClick={() => dialog.current?.close()}>
                        {t("close")}
                    </button>
                    <button className="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100" onClick={modify}>
                        {t("modify")}
                    </button>
                </section>
            </div>
        </dialog>
    );
};

export default ArticleModify;
