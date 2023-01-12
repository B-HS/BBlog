import { Button, Checkbox, Flex, Image, Input, Textarea } from "@chakra-ui/react";

const ReplyInput = () => {
    return (
        <>
            <Flex borderWidth={1} padding="1.25rem" marginY={"2rem"} flexDirection={"column"} width={"100%"}>
                <Flex alignItems={"center"} gap={5}>
                    <Image boxSize="60px" objectFit="cover" src="https://post-phinf.pstatic.net/MjAyMDAxMjhfMTM4/MDAxNTgwMTk5MjQ5NDg1.G4i58SRwMBGo9VYMrvxa1oKnzDrBlMB9zzq2Simd3Lwg.IA9GoThxbq1oS_FeeGMQ07CN-GFkDnlVjzjG1PVpbu8g.JPEG/%EC%98%A4%EB%AA%A9%EB%88%88%EC%9D%B4.JPG?type=w1200" alt={`profile-${"username"}`} />
                    <Flex flexDirection={"column"} width={"100%"} gap={2}>
                        <Flex gap={1} alignItems={"baseline"} className="font-extralight" flexDirection={"column"}>
                            <Input placeholder="닉네임" size="sm" borderRadius={0} />
                            <Input placeholder="비밀번호" size="sm" borderRadius={0} />
                        </Flex>
                        <Textarea placeholder="Here is a sample placeholder" borderRadius={0} />
                        <Flex justifyContent={"flex-end"} className="text-sm text-gray-500 " gap={3}>
                            <Checkbox defaultChecked>비밀 댓글</Checkbox>
                            <Button size={"sm"} borderRadius={0}>
                                {"댓글 등록"}
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default ReplyInput;
