import { Flex, Image } from "@chakra-ui/react";

const ReplyCard = () => {
    return (
        <>
            <Flex borderWidth={1} padding="1.25rem" flexDirection={"column"} width={"100%"}>
                <Flex alignItems={"center"} gap={5}>
                    <Image boxSize="60px" objectFit="cover" src="https://post-phinf.pstatic.net/MjAyMDAxMjhfMTM4/MDAxNTgwMTk5MjQ5NDg1.G4i58SRwMBGo9VYMrvxa1oKnzDrBlMB9zzq2Simd3Lwg.IA9GoThxbq1oS_FeeGMQ07CN-GFkDnlVjzjG1PVpbu8g.JPEG/%EC%98%A4%EB%AA%A9%EB%88%88%EC%9D%B4.JPG?type=w1200" alt={`profile-${"username"}`} alignSelf="flex-start" />
                    <Flex flexDirection={"column"} width={"100%"}>
                        <Flex gap={3} alignItems={"baseline"} className="font-extralight">
                            <span className="text-sm">Nickname</span>
                            <span className="text-xs text-gray-500">Date</span>
                        </Flex>
                        <span className="font-medium">Lorem ipsum dolor sit amet consectetur adipisicing elit. Et recusandae totam maiores laboriosam quae deleniti dolorem, veniam quod voluptatibus veritatis saepe id esse facilis ducimus pariatur unde eum ratione mollitia.</span>
                        <Flex gap={2} className="text-sm text-gray-500">
                            <span>{"답글"}</span>
                            <span>{"수정"}</span>
                            <span>{"삭제"}</span>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};
export default ReplyCard;
