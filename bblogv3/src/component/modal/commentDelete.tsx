import { t } from "i18next";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import useInput from "@/hooks/useInput";
import { Button, Input, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { requestCommentList, requestDeleteComment } from "@/ajax/ajax";
import { useRouter } from "next/router";
import { resetCommentInfo } from "@/store/global/global";

const CommentDelete = ({ showModal, setShowModal, rid }: { showModal: boolean; setShowModal: Function; rid: number }) => {
    const [pw, onChangePw, setPw] = useInput();
    const dialog = useRef<HTMLDialogElement>(null);
    const toast = useToast();
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    useEffect(() => {
        if (showModal) dialog.current?.showModal();
        if (!showModal) dialog.current?.close();
    }, [showModal]);

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
        return true;
    };
    const commentDelete = () => {
        if (validator()) {
            dispatch(requestDeleteComment({ rid: rid, pw: pw })).then((res) => {
                toast({
                    title: t("comment_removed"),
                    isClosable: false,
                    variant: "subtle",
                    status: "success",
                });
                dispatch(resetCommentInfo());
                dispatch(requestCommentList({ page: 0, size: rid, aid: router.query.slug as string }));
            });
        }
    };

    return (
        <dialog ref={dialog} onClose={() => setShowModal(false)} className="card w-[20%] min-w-[350px] h-fit shadow-xl">
            <div className="flex flex-col gap-2 justify-between h-full w-full dark:text-white">
                <div className="px-2 py-1 flex items-center justify-between">
                    <span className="text-2xl font-semibold leading-6 border-0 dark:text-gray-100">{t("delete_title")}</span>
                    <button onClick={() => setShowModal(false)}>
                        <Icon icon="material-symbols:close" className="text-xl cursor-pointer" />
                    </button>
                </div>
                <div className="border-t border-opacity-10 border-gray-200">
                    <dl>
                        <form className="p-2 pt-3 flex flex-col gap-2">
                            <Input type="password" className="custom-input input w-full border-0 text-center" value={pw} onChange={onChangePw} placeholder={t("pw")!} autoComplete="off" />
                        </form>

                        <div className="px-2 flex justify-end">
                            <Button className="btn btn-sm opacity-50 hover:opacity-100 transition-opacity" onClick={commentDelete}>
                                {t("comment_delete")}
                            </Button>
                        </div>
                    </dl>
                </div>
            </div>
        </dialog>
    );
};

export default CommentDelete;
