import { CircularProgress, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import Article from "../../Components/Article/Article";
import Hashtag from "../../Components/Article/Hashtag";
import ReplyInput from "../../Components/Article/ReplyInput";
import ReplyCard from "../../Components/Card/ReplyCard";
import { reqeustArticleDetail } from "../../Store/Async/articleAsync";
import { replyListReuqestMore } from "../../Store/Async/replyAsync";
import { clearReply } from "../../Store/Slice/replySlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { listRequest } from "../../Typings/type";

const Read = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const observeObj = useRef<HTMLDivElement>(null);
    const info = useRef<listRequest>({ page: 0, size: 5, total: 999 });
    const replyState = useAppSelector((state) => state.reply);
    const dispatch = useAppDispatch();
    const requestReplyList = () => {
        if (info.current.page > info.current.total) {
            return;
        }
        dispatch(replyListReuqestMore({ aid: slug, page: info.current.page, size: info.current.size }));
        info.current.page += 1;
        info.current.total = replyState.totalReply;
    };
    useEffect(() => {
        if (!router.isReady) {
            return;
        }
        dispatch(reqeustArticleDetail(slug));
        return () => {dispatch(clearReply())};
    }, [router.isReady]);

    useEffect(() => {
        const { current } = observeObj;
        if (!current) {
            return;
        }
        const obr = new IntersectionObserver((ele) => {
            if (ele[0].isIntersecting) {
                requestReplyList();
            }
        });
        obr.observe(current);
        return () => {
            obr.unobserve(current);
        };
    }, [requestReplyList]);

    return (
        <>
            {Loading && (
                <Flex width="w-screen" justifyContent={"center"}>
                    <CircularProgress isIndeterminate color="purple.300" />
                </Flex>
            )}
            {!Loading && articleDetail && (
                <Flex flexDirection={"column"} gap={3}>
                    <Article info={articleDetail}></Article>
                    <Hashtag tags={articleDetail.hashtag}></Hashtag>
                    <ReplyInput></ReplyInput>
                    {replyState.reply.map((v) => (
                        <ReplyCard key={v.rid} reply={v}></ReplyCard>
                    ))}
                    {replyState.Loading && (
                        <Flex width="w-screen" justifyContent={"center"}>
                            <CircularProgress isIndeterminate color="purple.300" />
                        </Flex>
                    )}
                    <div ref={observeObj}></div>
                </Flex>
            )}
        </>
    );
};

export default Read;
