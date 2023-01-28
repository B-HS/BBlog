import { Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";
import { BiCalendar, BiMenu } from "react-icons/bi";
import { OUTER_LINK } from "../../Store/Async/axiosConfig/URL";
import { articleProps } from "../../Typings/type";
import Tag from "./Tag";
dayjs.extend(relativeTime);
dayjs.locale("ko");
const ArticleCard = ({ info }: articleProps) => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
    const contexthtml = document.createElement("p");
    contexthtml.innerHTML = info.context;
    return (
        <Card className="card" direction={{ base: "column", sm: "row" }} variant="outline" borderRadius="0" boxSize={""}>
            <Link href={`/blog/${info.aid}`}>
                <Image objectFit="cover" minW={"300px"} minH={"300px"} width={"100%"} maxH={"300px"} maxW={{ base: "100%", sm: "250px" }} src={info.imgs[0] ? `${OUTER_LINK}/image/${info.imgs[0]}` : "/favicon.ico"} alt="Caffe Latte" />
            </Link>
            <Stack>
                <CardBody>
                    <section className="menu flex items-center text-gray-500">
                        <BiMenu/>
                        <Text fontSize="small">{info.menu}</Text>
                    </section>
                    <Link href={`/blog/${info.aid}`}>
                        <Heading size="lg" border={0}>
                            {info.title}
                        </Heading>
                    </Link>
                    <section className="date flex items-center gap-1 text-gray-500">
                        <BiCalendar className="-translate-y-[0.5px]"/>
                        <Text fontSize="small" color="gray.500">
                            {dayjs(info.articleCreatedDate).fromNow()}
                        </Text>
                    </section>
                    <Link href={`/blog/${info.aid}`}>
                        <Text py="2" color={"ThreeDLightShadow"}>{contexthtml.textContent} · · · ↲</Text>
                    </Link>
                </CardBody>
                <CardFooter flexDirection="row" gap="0.5rem" pt={0}>
                    <Tag tagName={info.hashtag} />
                </CardFooter>
            </Stack>
        </Card>
    );
};

export default ArticleCard;
