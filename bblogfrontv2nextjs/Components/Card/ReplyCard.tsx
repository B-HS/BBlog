import React from "react";
import { Flex, Image } from "@chakra-ui/react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import { replyInfo } from "../../Typings/type";

export interface replyProp {
    reply: replyInfo;
}
const ReplyCard = ({reply}:replyProp) => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
    return (
        <Flex borderWidth={1} padding="1.25rem" flexDirection={"column"} width={"100%"}>
            <Flex alignItems={"center"} gap={5}>
                <Image boxSize="60px" objectFit="cover" src={`${reply.member?.userimg?reply.member.userimg:"../favicon.ico"}`} alt={`profile-${reply.guestName?reply.guestName:reply.member.nickname}`} alignSelf="flex-start" />
                <Flex flexDirection={"column"} width={"100%"}>
                    <Flex gap={3} alignItems={"baseline"} className="font-extralight">
                        <span className="text-sm">{reply.guestName?reply.guestName:reply.member.nickname}</span>
                        <span className="text-xs text-gray-500">{dayjs(reply.replyCreatedDate).locale("ko").fromNow()}</span>
                    </Flex>
                    <span className="font-medium">{reply.context}</span>
                    <Flex gap={2} className="text-sm text-gray-500">
                        <span>{"답글"}</span>
                        <span>{"수정"}</span>
                        <span>{"삭제"}</span>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
export default ReplyCard;
