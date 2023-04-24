import { Badge, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Icon } from '@iconify/react';

const Tag = (props: { tagName: string[] }) => {
    const router = useRouter();
    return (
        <div className="flex gap-1 items-center flex-wrap text-xl">
            <Flex gap={3} flexWrap={"wrap"}>
                {props.tagName.map((v, i) => {
                    return (
                        <Badge cursor={"pointer"} key={i} px={2}>
                            # {v}
                        </Badge>
                    );
                })}
            </Flex>
        </div>
    );
};

export default Tag;
