import { t } from "i18next";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import useInput from "@/hooks/useInput";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { requestCommentList, requestEditComment } from "@/ajax/ajax";
import { resetCommentInfo } from "@/store/global/global";

const CommentModify = ({ showModal, setShowModal, rid }: { showModal: boolean; setShowModal: Function; rid: number }) => {
    const [commentDesc, onChangeCommentDesc, setCommentDesc] = useInput();
    const [pw, onChangePw, setPw] = useInput();
    const dialog = useRef<HTMLDialogElement>(null);
    const toast = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    const validator = () => {
        if (!pw || pw.trim().length === 0) {
            toast({
                title: t("comment_no_pw"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return false;
        }
        if (!commentDesc || commentDesc.trim().length === 0) {
            toast({
                title: t("comment_no_desc"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return false;
        }
        return true;
    };
    const commentModify = () => {
        if (validator()) {
            dispatch(requestEditComment({ rid: rid, pw: pw, commentDesc: commentDesc })).then((res) => {
                toast({
                    title: t("comment_edited"),
                    isClosable: false,
                    variant: "subtle",
                    status: "success",
                });
                dispatch(resetCommentInfo());
                dispatch(requestCommentList({ page: 0, size: res.payload + 10, aid: router.query.slug as string }));
            });
        }
    };
    useEffect(() => {
        if (showModal) dialog.current?.showModal();
        if (!showModal) dialog.current?.close();
    }, [showModal]);
    return (
        <dialog ref={dialog} onClose={() => setShowModal(false)} className="card w-[20%] min-w-[350px] h-fit shadow-xl">
            <div className="flex flex-col gap-2 justify-between h-full w-full dark:text-white">
                <div className="px-2 py-1 flex items-center justify-between">
                    <span className="text-2xl font-semibold leading-6 border-0 dark:text-gray-100">{t("edit_title")}</span>
                    <button onClick={() => setShowModal(false)}>
                        <Icon icon="material-symbols:close" className="text-xl cursor-pointer" />
                    </button>
                </div>
                <div className="border-t border-opacity-10 border-gray-200">
                    <dl>
                        <form className="p-2 pt-3 flex flex-col gap-2">
                            <Input type="text" className="custom-input input w-full border-0 text-center" value={commentDesc} onChange={onChangeCommentDesc} placeholder={t("context")!} autoComplete="off" />
                            <Input type="password" className="custom-input input w-full border-0 text-center" value={pw} onChange={onChangePw} placeholder={t("pw")!} autoComplete="off" />
                        </form>

                        <div className="px-2 flex justify-end">
                            <Button className="btn btn-sm opacity-50 hover:opacity-100 transition-opacity" onClick={commentModify}>
                                {t("modify")}
                            </Button>
                        </div>
                    </dl>
                </div>
            </div>
        </dialog>
    );
};

export default CommentModify;
