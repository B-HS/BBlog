import { article } from "@/app";
import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React, { useEffect, useRef } from "react";
import Tag from "./tag";
dayjs.extend(relativeTime);
dayjs.locale("ko");
const ArticleCard = ({ info }: { info: { article: article } }) => {
    const para = useRef(null)
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
    const { article } = info;
    useEffect(()=>{
        
    }, [])
    return (
        <Card className="card hover:-translate-y-1 hover:shadow-lg transition-all" direction={{ base: "column", sm: "row" }} variant="outline" borderRadius="0" shadow={"md"}>
            <Link href={`/blog/${article.aid}`}>
                <Image objectFit="cover" minW={"300px"} minH={"300px"} width={"100%"} maxH={"300px"} maxW={{ base: "100%", sm: "250px" }} src={article.thumbnail ? `https://hyns.dev/v1/image/${article.thumbnail}` : "https://mi.gumyo.net/files/47df371c-ec7f-4579-ac93-ca32fd25d54b"} alt={article.title} />
            </Link>
            <Stack>
                <CardBody pb={0}>
                    <section className="menu flex items-center text-gray-500">
                        <Text fontSize="small">{article.menu}</Text>
                    </section>
                    <Link href={`/blog/${article.aid}`}>
                        <Heading size="lg" border={0}>
                            {article.title}
                        </Heading>
                    </Link>
                    <section className="date flex items-center gap-1 text-gray-500">
                        <Text fontSize="small" color="gray.500">
                            {dayjs(article.createdDate).fromNow()}
                        </Text>
                    </section>
                    <Link href={`/blog/${article.aid}`}>
                        <div className="p-2 text-gray-500" dangerouslySetInnerHTML={{__html: article.context + " · · · ↲"}}></div>
                        <Text >
                        
                        </Text>
                    </Link>
                </CardBody>
                <CardFooter flexDirection="row" gap="0.5rem" pt={0}>
                    <Tag tagName={info.article.tags} />
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ArticleCard;
