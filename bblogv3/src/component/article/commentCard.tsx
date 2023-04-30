import { comment } from "@/app";
import { Avatar } from "@chakra-ui/react";
import dayjs from "dayjs";
import { t } from "i18next";
import { useState } from "react";
import CommentDelete from "../modal/commentDelete";
import CommentModify from "../modal/commentModify";
import CommentReply from "../modal/commentReply";

const CommentCard = ({ comment }: { comment: comment }) => {
    const [replyOpen, isReplyOpen] = useState<boolean>(false);
    const [editOpen, isEditOpen] = useState<boolean>(false);
    const [deleteOpen, isDeleteOpen] = useState<boolean>(false);
    return (
        <section className={`comment border-gray-600 my-3 px-2 py-5 ${comment.commentSort === 1 ? "pl-16" : ""}`}>
            <section className="comment_main flex">
                <section className="comment_icon w-28 flex align-top justify-center px-3 pb-6 pt-0">
                    <Avatar src={comment.commentImg} width="w-32" />
                </section>
                <section className="comment_main w-full flex flex-col gap-3">
                    <section className="comment_user flex gap-2 items-baseline">
                        <span className="font-bold text-xl">{comment.nickname}</span>
                        <span className="text-xs opacity-70">{`${dayjs(comment.uploadedDated).format("YYYY-MM-DD HH:mm:ss")}`}</span>
                    </section>
                    <section className="comment_description border-b border-gray-600 pb-3">{comment.commentDesc}</section>
                    <section className="comment_btns flex gap-3 justify-start w-full text-sm">
                        <button className="opacity-70 hover:opacity-100 transition-opacity" onClick={() => isReplyOpen(true)}>
                            {t("comment_reply")}
                        </button>
                        <span className="text-gray-600"> | </span>
                        <button className="opacity-70 hover:opacity-100 transition-opacity" onClick={() => isEditOpen(true)}>
                            {t("comment_edit")}
                        </button>
                        <span className="text-gray-600"> | </span>
                        <button className="opacity-70 hover:opacity-100 transition-opacity" onClick={() => isDeleteOpen(true)}>
                            {t("comment_delete")}
                        </button>
                    </section>
                </section>
            </section>
            <CommentDelete setShowModal={isDeleteOpen} showModal={deleteOpen} />
            <CommentModify setShowModal={isEditOpen} showModal={editOpen} />
            <CommentReply setShowModal={isReplyOpen} showModal={replyOpen} />
        </section>
    );
};

export default CommentCard;
