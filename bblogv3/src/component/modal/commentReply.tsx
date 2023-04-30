import { t } from "i18next";
import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import useInput from "@/hooks/useInput";
import { Button, Input } from "@chakra-ui/react";

const CommentReply = ({ showModal, setShowModal }: { showModal: boolean; setShowModal: Function }) => {
    const [nickname, onChangeNickname, setNickname] = useInput();
    const [commentDesc, onChangeCommentDesc, setCommentDesc] = useInput();
    const [pw, onChangePw, setPw] = useInput();
    const dialog = useRef<HTMLDialogElement>(null);
    const commentReply = () => {
        console.log("comment delete");
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
