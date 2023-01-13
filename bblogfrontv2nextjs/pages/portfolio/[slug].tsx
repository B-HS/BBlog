import React from "react";
import { Flex } from "@chakra-ui/react";
import Post from "../../Components/Article/Post";
import Hashtag from "../../Components/Article/Hashtag";

const ReadPortfolio = () => {
    return (
        <Flex flexDirection={"column"} gap={3}>
            <Post></Post>
            <Hashtag></Hashtag>
        </Flex>
    );
};

export default ReadPortfolio;
