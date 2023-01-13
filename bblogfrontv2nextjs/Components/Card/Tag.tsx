import React from "react";
import { Badge, Flex } from "@chakra-ui/react";
import { BiPurchaseTag } from "react-icons/bi";

const Tag = (props: { tagName: string[] }) => {
    return (
        <>
            <div className="flex gap-1 items-center flex-wrap text-xl">
                <BiPurchaseTag className="-scale-x-100" />
                <Flex gap={3}>
                    {props.tagName.map((v, i) => {
                        return <Badge key={i}>{v}</Badge>;
                    })}
                </Flex>
            </div>
        </>
    );
};

export default Tag;
