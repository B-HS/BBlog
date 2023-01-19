import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";
import { BsTools } from "react-icons/bs";
import { articleProps } from "../../Typings/type";
import Tag from "./Tag";

const PortfolioCard = ({ info }: articleProps) => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
    return (
        <Card className="card" borderRadius={0}>
            <CardBody>
                <Link href={`/portfolio/${info.aid}`}>
                    <Image src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80" alt="Green double couch with wooden legs" borderRadius="0" />
                </Link>
                <Stack mt="6" mb={2} spacing="3">
                    <section className="date flex items-center gap-1 text-gray-500">
                        <BsTools className="translate-y-[1.5px]" />
                        {info.start && (
                            <Flex alignItems={"center"}>
                                <Text fontSize={"sm"} color="gray.500" transform={"auto"} translateY={"1px"}>
                                    {dayjs(info.start).locale("ko").format("YYYY년 MM월 DD일")}
                                </Text>
                                <span> ~ </span>
                                <Text fontSize={"sm"} color="gray.500" transform={"auto"} translateY={"1px"}>
                                    {dayjs(info.end).locale("ko").format("YYYY년 MM월 DD일")}
                                </Text>
                            </Flex>
                        )}
                    </section>
                    <Link href={`/portfolio/${info.aid}`}>
                        <Heading size="md">{info.title}</Heading>
                    </Link>
                </Stack>
                <section className="stack">
                    <Tag tagName={info.hashtag} />
                </section>
            </CardBody>
            <Divider />
            <CardFooter>
                <ButtonGroup spacing="2" flexWrap={"wrap"}>
                    {info.github && (
                        <a href={info.github}>
                            <Button variant="solid" colorScheme="blackAlpha" borderRadius={0}>
                                깃허브
                            </Button>
                        </a>
                    )}
                    {info.published && (
                        <a href={info.published}>
                            <Button variant="solid" colorScheme="telegram" borderRadius={0}>
                                배포 사이트
                            </Button>
                        </a>
                    )}
                    <Link href={`/blog/${info.aid}`}>
                        <Button variant="solid" colorScheme="telegram" borderRadius={0}>
                            자세히
                        </Button>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default PortfolioCard;
