import { Badge, Flex, Tag as CTag } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Tag = (props: { tagName: string[] }) => {
    const router = useRouter();
    return (
        <div className="flex gap-1 items-center flex-wrap text-xl">
            <Flex gap={3} flexWrap={"wrap"}>
                {props.tagName.map((v, i) => {
                    return (
                        <CTag border={"1px solid rgba(255, 255, 255, 0.1)"} borderRadius={0} cursor={"pointer"} key={i} px={2}>
                            # {v}
                        </CTag>
                    );
                })}
            </Flex>
        </div>
    );
};

export default Tag;
