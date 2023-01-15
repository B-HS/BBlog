import { CircularProgress, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Article from "../../Components/Article/Article";
import Hashtag from "../../Components/Article/Hashtag";
import ReplyInput from "../../Components/Article/ReplyInput";
import ReplyCard from "../../Components/Card/ReplyCard";
import { reqeustArticleDetail } from "../../Store/Async/articleAsync";
import { replyListReuqest } from "../../Store/Async/replyAsync";
import { useAppDispatch, useAppSelector } from "../../Store/store";

const Read = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const replyState  = useAppSelector((state)=>state.reply)
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!router.isReady) return;
        dispatch(reqeustArticleDetail(slug));
        dispatch(replyListReuqest({aid:slug, page:0, size:5}));
        console.log(slug);
    }, [router.isReady]);

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
                    {replyState.reply.map(v=><ReplyCard key={v.rid} reply={v}></ReplyCard>)}
                    
                </Flex>
            )}
        </>
    );
};

export default Read;
