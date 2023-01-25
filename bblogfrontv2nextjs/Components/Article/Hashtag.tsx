import { Flex } from "@chakra-ui/react";
import React from "react";
import Tag from "../Card/Tag";

export interface tagProp {
    tags: string[];
}
const Hashtag = ({ tags }: tagProp) => {
    return (
        <Flex borderWidth={1} padding="1rem 1rem" flexDirection={"column"} gap={2}>
            <Tag tagName={tags ? tags : []} />
        </Flex>
    );
};

export default Hashtag;
