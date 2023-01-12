import { Flex } from "@chakra-ui/react";
import Hashtag from "../Components/Article/Hashtag";
import Post from "../Components/Article/Post";
import ReplyInput from "../Components/Article/ReplyInput";
import ReplyCard from "../Components/Article/ReplyList";

const Read = () => {
    return (
        <>
            <Flex flexDirection={"column"} gap={3}>
                <Post></Post>
                <Hashtag></Hashtag>
                <ReplyInput></ReplyInput>
                <ReplyCard></ReplyCard>
            </Flex>
        </>
    );
};

export default Read;
