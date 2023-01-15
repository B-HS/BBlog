import { CircularProgress, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Article from "../../Components/Article/Article";
import Hashtag from "../../Components/Article/Hashtag";
import { reqeustArticleDetail } from "../../Store/Async/articleAsync";
import { useAppDispatch, useAppSelector } from "../../Store/store";

const ReadPortfolio = () => {
    const router = useRouter();
    const { slug } = router.query;
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!router.isReady) return;
        dispatch(reqeustArticleDetail(slug));
        console.log(slug);
    }, [router.isReady]);

    return (
        <>
            {Loading && !articleDetail && (
                <Flex width="w-screen" justifyContent={"center"}>
                    <CircularProgress isIndeterminate color="purple.300" />
                </Flex>
            )}
            {!Loading && articleDetail && (
                <Flex flexDirection={"column"} gap={3}>
                    <Article info={articleDetail}></Article>
                    <Hashtag tags={articleDetail.hashtag}></Hashtag>
                </Flex>
            )}
        </>
    );
};

export default ReadPortfolio;
