import { Button, CircularProgress, Flex } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import Article from "../../Components/Article/Article";
import Hashtag from "../../Components/Article/Hashtag";
import { removeRequest, reqeustArticleDetail } from "../../Store/Async/articleAsync";
import { adminCookie } from "../../Store/Async/memberAsync";
import { clearArticles } from "../../Store/Slice/articleSlice";
import { clearReply } from "../../Store/Slice/replySlice";
import wrapper, { useAppDispatch, useAppSelector } from "../../Store/store";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { slug } = context.query;
    const {payload} = await store.dispatch(reqeustArticleDetail(slug));
    return { props: { message: "Message from SSR", payload:payload } };
});

const ReadPortfolio:NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { slug } = router.query;
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const [addtional, setAdditional] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!router.isReady) return;

        if (getCookie("admin")) {
            dispatch(adminCookie({ access: getCookie("admin") })).then((res) => setAdditional(res.payload));
        }
        return () => {
            dispatch(clearReply());
        };
    }, [router.isReady]);
    const deleteArticle = () => {
        dispatch(removeRequest({ aid: Number.parseInt(slug as string), access: getCookie("access"), refresh: getCookie("refresh") }))
            .then(() => dispatch(clearArticles()))
            .then(() => router.push("/portfolio"));
    };

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
                    {addtional && (
                        <Flex gap={2}>
                            <Button onClick={() => router.push(`/write?aid=${slug}`)} bg={"transparent"} border={"1px"} borderColor={"gray.300"} size={"sm"} borderRadius={"0"}>
                                수정
                            </Button>
                            <Button onClick={() => deleteArticle()} bg={"transparent"} border={"1px"} borderColor={"gray.300"} size={"sm"} borderRadius={"0"}>
                                삭제
                            </Button>
                        </Flex>
                    )}
                </Flex>
            )}
        </>
    );
};

export default ReadPortfolio;
