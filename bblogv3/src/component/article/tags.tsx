import { Flex } from "@chakra-ui/react";
import React from "react";
import Tag from "../card/tag";

export interface tagProp {
    tags: string[];
}
const Tags = ({ tags }: tagProp) => {
    return (
        <Flex  padding="1rem 1rem" flexDirection={"column"} gap={2}>
            <Tag tagName={tags ? tags : []} />
        </Flex>
    );
};

export default Tags;
