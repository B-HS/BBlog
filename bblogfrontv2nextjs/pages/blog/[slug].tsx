import { Button, CircularProgress, Flex } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import Article from "../../Components/Article/Article";
import Hashtag from "../../Components/Article/Hashtag";
import ReplyInput from "../../Components/Article/ReplyInput";
import ReplyCard from "../../Components/Card/ReplyCard";
import { removeRequest, reqeustArticleDetail } from "../../Store/Async/articleAsync";
import { adminCookie } from "../../Store/Async/memberAsync";
import { replyListReuqestMore } from "../../Store/Async/replyAsync";
import { clearArticles } from "../../Store/Slice/articleSlice";
import { clearReply } from "../../Store/Slice/replySlice";
import wrapper, { useAppDispatch, useAppSelector } from "../../Store/store";
import { listRequest, replyInfo } from "../../Typings/type";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    const { slug } = context.query;
    const { referer } = context.req.headers;
    const { payload } = await store.dispatch(reqeustArticleDetail({ num: slug, prev: referer }));
    return { props: { message: "Message from SSR", payload: payload } };
});

const Read: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const router = useRouter();
    const { slug } = router.query;
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const observeObj = useRef<HTMLDivElement>(null);
    const info = useRef<listRequest>({ page: 0, size: 5, total: 999 });
    const [addtional, setAdditional] = useState<boolean>(false);
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
        if (getCookie("admin")) {
            dispatch(adminCookie({ access: getCookie("admin") })).then((res) => setAdditional(res.payload));
        }
        return () => {
            dispatch(clearReply());
        };
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

    const deleteArticle = () => {
        dispatch(removeRequest({ aid: Number.parseInt(slug as string), access: getCookie("access"), refresh: getCookie("refresh") }))
            .then(() => dispatch(clearArticles()))
            .then(() => router.push("/blog"));
    };
    return (
        <>
            <Head>
                <title>{`HS :: ${articleDetail ? articleDetail.title : ""}`}</title>
                <meta name="description" content={`${articleDetail ? articleDetail.context.replace(/<[^>]+>/g, "") : ""}`} />
                <meta name="keywords" content={`${articleDetail.tag ? articleDetail.tags.join(", ") : "blog"}`} />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content={`HS :: ${articleDetail ? articleDetail.title : ""}`} />
                <meta property="og:image" content={articleDetail.imgName ? articleDetail.imgName[0] : "https://portfolio.hyns.co.kr/favicon.ico"} />
                <meta property="og:description" content={`${articleDetail ? articleDetail.context.replace(/<[^>]+>/g, "") : ""}`} />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            {Loading && (
                <Flex width="w-screen" justifyContent={"center"}>
                    <CircularProgress isIndeterminate color="purple.300" />
                </Flex>
            )}
            {!Loading && articleDetail && (
                <Flex flexDirection={"column"} gap={3}>
                    <Article info={articleDetail}></Article>
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
                    <Hashtag tags={articleDetail.hashtag}></Hashtag>
                    <ReplyInput></ReplyInput>
                    <Flex flexDirection={"column"} overflow={"hidden"}>
                        {replyState.reply.map((v:replyInfo) => (
                            <ReplyCard key={v.rid} reply={v}></ReplyCard>
                        ))}
                    </Flex>
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
