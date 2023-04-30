import ArticleCard from "@/component/card/articleCard";
import { Flex } from "@chakra-ui/react";

const Blog = () => {
    return (
        <Flex flexDirection={'column'} gap={7}>
            {[0, 0, 0, 0, 0, 0, 0].map(() => (
                <ArticleCard info={{ article: { aid:1, context: "123123123", hide: false, menu: "BLOG", tags: ['1', "2", "3", "4", "5"], thumbnail: "", title: "TEST" } }} />
            ))}
        </Flex>
    );
};

export default Blog;
