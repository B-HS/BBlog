import { Box, CircularProgress, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import dompurify from "isomorphic-dompurify";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { requestIntro } from "../Store/Async/articleAsync";
import wrapper, { useAppSelector } from "../Store/store";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
    const { payload } = await store.dispatch(requestIntro());
    return { props: { message: "Message from SSR", payload: payload } };
});

const Resume: NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const sanitizer = dompurify.sanitize;
    useEffect(() => {}, [props]);
    return (
        <>
            <Head>
                <title>HS :: Intro</title>
                <meta name="description" content={`${articleDetail.context.replace(/<[^>]+>/g, "")}`} />
                <meta name="keywords" content="Developer homepage, Intropage, Resume" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Intro" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content={`${articleDetail.context.replace(/<[^>]+>/g, "")}`} />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <Box borderWidth="1px" p={5} mt={5}>
                {Loading && (
                    <Flex width="w-screen" justifyContent={"center"}>
                        <CircularProgress isIndeterminate color="purple.300" />
                    </Flex>
                )}
                {!Loading && articleDetail && (
                    <Flex direction={"column"} gap={3}>
                        <Flex alignItems={"center"} gap={1}>
                            <BiCalendar />
                            <span className="text-sm text-gray-500 translate-y-[0.5px]">{dayjs(articleDetail.articleCreatedDate).locale("ko").format("YYYY년 MM월 DD일")}</span>
                        </Flex>
                        <div dangerouslySetInnerHTML={{ __html: sanitizer(articleDetail.context) }}></div>
                    </Flex>
                )}
            </Box>
        </>
    );
};

export default Resume;
