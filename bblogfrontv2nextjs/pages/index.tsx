import { Box, CircularProgress, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import dompurify from "isomorphic-dompurify";
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from "next";
import React, { useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { requestIntro } from "../Store/Async/articleAsync";
import wrapper, { useAppSelector } from "../Store/store";

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
    console.log(context);
    
    const {payload} = await store.dispatch(requestIntro());
    return { props: { message: "Message from SSR", payload:payload } };
});

const Resume:NextPage = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const sanitizer = dompurify.sanitize;
    useEffect(() => {
    }, [props]);
    return (
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
    );
};



export default Resume;
