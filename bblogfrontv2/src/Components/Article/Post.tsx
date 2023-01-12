import { Flex, Text } from "@chakra-ui/react";
import { BiCalendar, BiMenu } from "react-icons/bi";

const Post = () => {
    return (
        <>
            <Flex borderWidth={1} padding="1.25rem" flexDirection={"column"} gap={2}>
                <section className="menu flex items-center text-gray-500">
                    <BiMenu />
                    <Text fontSize="medium">Menu</Text>
                </section>
                <section className="title">
                    <h1 className="text-3xl">Title</h1>
                </section>
                <section className="date flex items-center text-gray-500 text-sm justify-between">
                    <Flex className="data_string" alignItems={"center"}>
                        <BiCalendar />
                        <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                            2023.01.01 15:11
                        </Text>
                    </Flex>
                    <span>조회수 : {"1234"}</span>
                </section>
                <hr />
                <p>description of article</p>
            </Flex>
        </>
    );
};

export default Post;
