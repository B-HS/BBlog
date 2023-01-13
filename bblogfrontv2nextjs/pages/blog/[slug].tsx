import React from "react";
import { Flex } from "@chakra-ui/react";
import Post from "../../Components/Article/Post";
import Hashtag from "../../Components/Article/Hashtag";
import ReplyInput from "../../Components/Article/ReplyInput";
import ReplyCard from "../../Components/Card/ReplyCard";

const Read = () => {
    return (
        <Flex flexDirection={"column"} gap={3}>
            <Post></Post>
            <Hashtag></Hashtag>
            <ReplyInput></ReplyInput>
            <ReplyCard></ReplyCard>
        </Flex>
    );
};

export default Read;
