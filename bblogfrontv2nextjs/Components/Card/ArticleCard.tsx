import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { BiCalendar, BiMenu } from "react-icons/bi";
import { articleProps } from "../../Typings/type";
import Tag from "./Tag";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ko";
import AXIOS_URL from "../../Store/Async/axiosConfig/URL";
dayjs.extend(relativeTime);
dayjs.locale("ko");
const ArticleCard = ({ info }: articleProps) => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
    const contexthtml = document.createElement("p");
    contexthtml.innerHTML = info.context;
    return (
        <Card className="card" direction={{ base: "column", sm: "row" }} variant="outline" borderRadius="0">
            <Link href={`/blog/${info.aid}`}>
                <Image objectFit="cover" minW={"300px"} minH={"300px"} width={"100%"} maxH={"300px"} maxW={{ base: "100%", sm: "250px" }} src={info.imgs[0] ? `${AXIOS_URL}/blogapi/image/${info.imgs[0]}` : "./favicon.ico"} alt="Caffe Latte" />
            </Link>
            <Stack>
                <CardBody>
                    <section className="menu flex items-center text-gray-500">
                        <BiMenu />
                        <Text fontSize="small">{info.menu}</Text>
                    </section>
                    <Link href={`/blog/${info.aid}`}>
                        <Heading size="lg">{info.title}</Heading>
                    </Link>
                    <section className="date flex items-center text-gray-500">
                        <BiCalendar />
                        <Text fontSize="small" color="gray.500">
                            {dayjs(info.articleCreatedDate).fromNow()}
                        </Text>
                    </section>
                    <Link href={`/blog/${info.aid}`}>
                        <Text py="2">{contexthtml.textContent}</Text>
                    </Link>
                </CardBody>
                <CardFooter flexDirection="row" gap="0.5rem">
                    <Tag tagName={info.hashtag} />
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ArticleCard;
