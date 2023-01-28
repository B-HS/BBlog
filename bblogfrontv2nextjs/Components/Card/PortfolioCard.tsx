import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";
import { BsTools } from "react-icons/bs";
import { OUTER_LINK } from "../../Store/Async/axiosConfig/URL";
import { articleProps } from "../../Typings/type";
import Tag from "./Tag";

const PortfolioCard = ({ info }: articleProps) => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
    return (
        <Card className="card" borderRadius={0}>
            <CardBody>
                <Link href={`/portfolio/${info.aid}`}>
                    <Image src={info.imgs[0] ? `${OUTER_LINK}/image/${info.imgs[0]}` : "/favicon.ico"} alt={`${info.aid}`} borderRadius="0" minHeight={"400px"} />
                </Link>
                <Stack mt="6" mb={2} spacing="3">
                    <section className="date flex items-center gap-1 text-gray-500">
                        <BsTools className="translate-y-[1.5px]" />
                        {info.start && (
                            <Flex alignItems={"center"} gap={1}>
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
                        <Heading size="md" border={0}>
                            {info.title}
                        </Heading>
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
                    <Link href={`/portfolio/${info.aid}`}>
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
