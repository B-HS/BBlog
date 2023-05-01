import { t } from "i18next";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import useInput from "@/hooks/useInput";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/router";
import { requestAddComment, requestCommentList } from "@/ajax/ajax";
import { comment } from "@/app";
import { resetCommentInfo } from "@/store/global/global";

const CommentReply = ({ showModal, setShowModal, comment }: { showModal: boolean; setShowModal: Function; comment: comment }) => {
    const [nickname, onChangeNickname, setNickname] = useInput();
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
        if (!nickname || nickname.trim().length === 0) {
            toast({
                title: t("comment_no_nickname"),
                isClosable: false,
                variant: "subtle",
                status: "warning",
            });
            return false;
        }
        return true;
    };

    const commentReply = () => {
        if (validator()) {
            dispatch(requestAddComment({ nickname: nickname, pw: pw, commentDesc: commentDesc, commentGroup: comment.commentGroup, commentSort: 1, aid:comment.aid })).then((res) => {
                toast({
                    title: t("comment_registered"),
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
                    <span className="text-2xl font-semibold leading-6 border-0 dark:text-gray-100">{t("reply_title")}</span>
                    <Button onClick={() => dialog.current?.close()}>
                        <Icon icon="material-symbols:close" className="text-xl cursor-pointer" />
                    </Button>
                </div>
                <div className="border-t border-opacity-10 border-gray-200">
                    <dl>
                        <form className="p-2 pt-3 flex flex-col gap-2">
                            <Input type="text" className="custom-input input w-full border-0 text-center" onChange={onChangeNickname} value={nickname} placeholder={t("nickname")!} />
                            <Input type="password" className="custom-input input w-full border-0 text-center" onChange={onChangePw} value={pw} placeholder={t("pw")!} autoComplete="off" />
                            <textarea className="align-middle custom-input resize-none input w-full border-0 text-center" onChange={onChangeCommentDesc} value={commentDesc} placeholder={t("context")!} />
                        </form>
                        <div className="px-2 flex justify-end">
                            <Button className="btn btn-sm opacity-50 hover:opacity-100 transition-opacity" onClick={commentReply}>
                                {t("submit")}
                            </Button>
                        </div>
                    </dl>
                </div>
            </div>
        </dialog>
    );
};

export default CommentReply;
