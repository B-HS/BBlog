import { article } from "@/app";
import { Button, Flex, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import dompurify from "isomorphic-dompurify";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import ArticleDelete from "../modal/articleDelete";
import ArticleModify from "../modal/articleModify";

const Post = ({ article }: { article: article }) => {
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [isModify, setIsModify] = useState<boolean>(false);
    const globals = useSelector((state: RootState) => state.global);
    const sanitizer = dompurify.sanitize;
    const router = useRouter();
    return (
        <Flex w="full" padding="1.25rem" flexDirection={"column"} gap={2}>
            {globals.auth && (
                <section className="admin-btn flex gap-2">
                    <Button p="0.5" px="2" onClick={() => setIsDelete(true)}>
                        Remove
                    </Button>
                    <Button p="0.5" px="2" onClick={() => setIsModify(true)}>
                        modify
                    </Button>
                </section>
            )}
            <section className="menu flex items-center gap-1 text-gray-500" onClick={() => (!article.startDate ? router.push("/blog") : router.push("/portfolio"))}>
                <Icon icon="ic:baseline-menu" />
                <Text fontSize="medium" cursor={"pointer"}>
                    {article.menu}
                </Text>
            </section>
            <section className="title mb-2">
                <Text className="text-3xl">:: {article.title}</Text>
            </section>
            <section className="date flex items-center text-gray-500 text-sm justify-between">
                <Flex className="data_string" alignItems={"center"} gap={1} width={"100%"}>
                    {!article.startDate && <Icon icon="material-symbols:date-range-sharp" />}
                    {!article.startDate && (
                        <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                            {dayjs(article.createdDate).locale("ko").format("YYYY MM DD - HH:mm")}
                        </Text>
                    )}
                    {article.startDate && (
                        <Flex gap={5} width={"100%"} justifyContent={"space-between"} flexWrap={"wrap"}>
                            <Flex gap={1} alignItems={"center"}>
                                <Icon icon="bi:tools" />
                                <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                                    {dayjs(article.startDate).locale("ko").format("YYYY MM DD")}
                                </Text>
                                <Text color="gray.500" transform={"auto"} translateY={"1px"}>
                                    <span> ~ </span>
                                    {dayjs(article.endDate).locale("ko").format("YYYY MM DD")}
                                </Text>
                            </Flex>
                            <Flex gap={3}>
                                <Flex alignItems={"center"}>
                                    <Icon icon="bi:link-45deg" />
                                    <a href={article.github}>{article.github?.split("//")[1]}</a>
                                </Flex>
                                <Flex alignItems={"center"}>
                                    <Icon icon="bi:link-45deg" />
                                    <a href={article.publish}>{article.publish?.split("//")[1]}</a>
                                </Flex>
                            </Flex>
                        </Flex>
                    )}
                </Flex>
                {!article.startDate && <span className="whitespace-pre">조회수 : {article.visitCnt}</span>}
            </section>
            <hr className="my-3 border-t-gray-500" />
            <div dangerouslySetInnerHTML={{ __html: sanitizer(article.context) }}></div>
            <ArticleDelete article={article} showModal={isDelete} setShowModal={setIsDelete} />
            <ArticleModify article={article} showModal={isModify} setShowModal={setIsModify} />
        </Flex>
    );
};

export default Post;
