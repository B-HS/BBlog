import { Box, CircularProgress, Flex } from "@chakra-ui/react";
import dayjs from "dayjs";
import dompurify from "isomorphic-dompurify";
import React, { useEffect } from "react";
import { BiCalendar } from "react-icons/bi";
import { requestIntro } from "../Store/Async/articleAsync";
import { useAppDispatch, useAppSelector } from "../Store/store";

const Resume = () => {
    const { articleDetail, Loading } = useAppSelector((state) => state.article);
    const dispatch = useAppDispatch();
    const sanitizer = dompurify.sanitize;
    useEffect(() => {
        dispatch(requestIntro());
    }, []);
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
