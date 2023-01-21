import { Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import dompurify from "isomorphic-dompurify";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { BiCalendar, BiLink, BiMenu } from "react-icons/bi";
import { BsTools } from "react-icons/bs";
import { articleProps } from "../../Typings/type";

const Post = ({ info }: articleProps) => {
    const sanitizer = dompurify.sanitize;
    const router = useRouter();
    return (
        <Flex borderWidth={1} padding="1.25rem" flexDirection={"column"} gap={2}>
            <section className="menu flex items-center gap-1 text-gray-500" onClick={() => (!info.start ? router.push("/blog") : router.push("/portfolio"))}>
                <BiMenu />
                <Text fontSize="medium" cursor={"pointer"}>
                    {info.menu}
                </Text>
            </section>
            <section className="title mb-2">
                <h1 className="text-3xl">:: {info.title}</h1>
            </section>
            <section className="date flex items-center text-gray-500 text-sm justify-between">
                <Flex className="data_string" alignItems={"center"} gap={1} width={"100%"} >
                    {!info.start && <BiCalendar className="translate-y-[1px]" />}
                    {info.start && <BsTools className="translate-y-[1px]" />}
                    {!info.start && (
                        <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                            {dayjs(info.articleCreatedDate).locale("ko").format("YYYY년 MM월 DD일 ddd요일 HH:mm")}
                        </Text>
                    )}
                    {info.start && (
                        <Flex gap={5} width={"100%"} justifyContent={"space-between"}>
                            <Flex gap={1}>
                                <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                                    {dayjs(info.start).locale("ko").format("YYYY년 MM월 DD일")}
                                </Text>
                                <span> ~ </span>
                                <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                                    {dayjs(info.end).locale("ko").format("YYYY년 MM월 DD일")}
                                </Text>
                            </Flex>
                            <Flex gap={3}>
                                <Flex alignItems={"center"}>
                                    <BiLink className="translate-y-[1px]" />
                                    <a href={info.github}>{info.github.split("//")[1]}</a>
                                </Flex>
                                <Flex alignItems={"center"}>
                                    <BiLink className="translate-y-[1px]" />
                                    <a href={info.published}>{info.published.split("//")[1]}</a>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                {!info.start && <span className="whitespace-pre">조회수 : {info.visitors}</span>}
            </section>
            <hr className="my-5" />
            <div dangerouslySetInnerHTML={{ __html: sanitizer(info.context) }}></div>
        </Flex>
    );
};

export default Post;
