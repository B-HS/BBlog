import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import dompurify from "isomorphic-dompurify";
import Link from "next/link";
import React from "react";
import { BiCalendar, BiMenu } from "react-icons/bi";
import { articleProps } from "../../Typings/type";

const Post = ({ info }: articleProps) => {
    const sanitizer = dompurify.sanitize;
    return (
        <Flex borderWidth={1} padding="1.25rem" flexDirection={"column"} gap={2}>
            <section className="menu flex items-center text-gray-500">
                <BiMenu />
                <Link href={"/blog"}>
                    <Text fontSize="medium">{info.menu}</Text>
                </Link>
            </section>
            <section className="title">
                <h1 className="text-3xl">{info.title}</h1>
            </section>
            <section className="date flex items-center text-gray-500 text-sm justify-between">
                <Flex className="data_string" alignItems={"center"} gap={1}>
                    <BiCalendar className="translate-y-[1px]" />
                    <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                        {dayjs(info.articleCreatedDate).locale("ko").format("YYYY년 MM월 DD일 ddd요일 HH:mm")}
                    </Text>
                </Flex>
                <span>조회수 : {info.visitors}</span>
            </section>
            <hr />
            <div dangerouslySetInnerHTML={{ __html: sanitizer(info.context) }}></div>
        </Flex>
    );
};

export default Post;
