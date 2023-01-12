import { Flex } from "@chakra-ui/react";
import Hashtag from "../Components/Article/Hashtag";
import Post from "../Components/Article/Post";

const ReadPortfolio = () => {
    return (
        <>
            <Flex flexDirection={"column"} gap={3}>
                <Post></Post>
                <Hashtag></Hashtag>
            </Flex>
        </>
    );
};

export default ReadPortfolio;
