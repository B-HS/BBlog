import React from "react";
import { Flex } from "@chakra-ui/react";
import ReplyCard from "../Card/ReplyCard";

const ReplyList = () => {
    return (
        <>
            <Flex flexDirection={"column"} gap={1}>
                {Array.from({ length: 10 }).map((v, i) => {
                    return <ReplyCard key={i} />;
                })}
            </Flex>
        </>
    );
};

export default ReplyList;
