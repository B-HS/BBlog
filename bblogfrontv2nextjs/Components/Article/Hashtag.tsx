import React from "react";
import { Flex } from "@chakra-ui/react";
import Tag from "../Card/Tag";

const Hashtag = () => {
    const tmpTag = ["1234", "32415"]
    return (
        <>
            <Flex borderWidth={1} padding="1rem 1rem" flexDirection={"column"} gap={2}>
                <Tag tagName={tmpTag} />
            </Flex>
        </>
    );
};

export default Hashtag;
