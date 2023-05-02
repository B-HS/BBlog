import { requestDeleteArticle } from "@/ajax/ajax";
import { article } from "@/app";
import { AppDispatch } from "@/store/store";
import { t } from "i18next";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

const ArticleDelete = ({ article, showModal, setShowModal }: { article: article; showModal: boolean; setShowModal: Function }) => {
    const dialog = useRef<HTMLDialogElement>(null);
    const dispatch = useDispatch<AppDispatch>();

    const articleDelete = () => {
        dispatch(requestDeleteArticle(article)).then(() => {
            window.location.href = `${article.menu === "PORTFOLIO" ? "/portfolio" : "/blog"}`;
        });
    };

    useEffect(() => {
        if (showModal) dialog.current?.showModal();
        if (!showModal) dialog.current?.close();
    }, [showModal]);

    return (
        <dialog ref={dialog} onClose={() => setShowModal(false)} className="card w-[20%] min-w-[350px] h-fit shadow-xl">
            <div className="flex flex-col gap-2 justify-between h-full w-full dark:text-white">
                <h3 className="delete-header border-b border-black dark:border-slate-500">{t("article_delete")}</h3>
                <section className="delete-body">{t("is_del")}</section>
                <section className="delete-footer w-full flex justify-end gap-3">
                    <button className="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100" onClick={() => dialog.current?.close()}>
                        {t("close")}
                    </button>
                    <button className="btn btn-sm border dark:text-white border-slate-500 border-opacity-30 hover:border-opacity-100" onClick={articleDelete}>
                        {t("delete")}
                    </button>
                </section>
            </div>
        </dialog>
    );
};

export default ArticleDelete;
