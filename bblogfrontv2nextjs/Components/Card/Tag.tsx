import { Badge, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { BiPurchaseTag } from "react-icons/bi";
import { setSearchKeyword } from "../../Store/Slice/articleSlice";
import { useAppDispatch } from "../../Store/store";

const Tag = (props: { tagName: string[] }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    return (
        <div className="flex gap-1 items-center flex-wrap text-xl">
            <BiPurchaseTag className="-scale-x-100" />
            <Flex gap={3} flexWrap={"wrap"}>
                {props.tagName.map((v, i) => {
                    return (
                        <Badge
                            cursor={"pointer"}
                            key={i}
                            onClick={() => {
                                dispatch(setSearchKeyword(v));
                                router.push("/blog");
                            }}
                        >
                            {v}
                        </Badge>
                    );
                })}
            </Flex>
        </div>
    );
};

export default Tag;
