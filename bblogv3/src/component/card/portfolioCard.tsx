import { Icon } from "@iconify/react";
import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import Link from "next/link";
import React from "react";
import Tag from "./tag";
import { article } from "@/app";
import { t } from "i18next";

const PortfolioCard = ({ info }: { info: article }) => {
    dayjs.extend(relativeTime);
    dayjs.locale("ko");
    return (
        <Card className="hover:-translate-y-1 hover:shadow-lg transition-all" borderRadius={0} border={'1px solid rgba(200, 200, 200, 0.2)'} shadow={'md'}>
            <CardBody p={0}>
                    <Link href={`/portfolio/${info.aid}`}>
                        <Image objectFit={'fill'} className="w-full h-full max-h-[225px] max-w-[395px]" src={info.thumbnail ? `https://hyns.dev/v1/image/${info.thumbnail}` : "/favicon.ico"} borderRadius="0" />
                    </Link>
                <Stack p="3">
                    <section className="date flex items-center gap-1 text-gray-500">
                        <Icon icon="bi:tools" />
                        {info.startDate && (
                            <Flex alignItems={"center"} gap={1}>
                                <Text fontSize={"sm"} color="gray.500" transform={"auto"} translateY={"1px"}>
                                    {dayjs(info.startDate).locale("ko").format("YYYY MM DD")}
                                </Text>
                                <span> ~ </span>
                                <Text fontSize={"sm"} color="gray.500" transform={"auto"} translateY={"1px"}>
                                    {dayjs(info.endDate).locale("ko").format("YYYY MM DD")}
                                </Text>
                            </Flex>
                        )}
                    </section>
                    <Link href={`/portfolio/${info.aid}`}>
                        <Heading size="md" border={0} px={2}>
                            {info.title}
                        </Heading>
                    </Link>
                </Stack>
                <section className="stack p-3">
                    <Tag tagName={info.tags} />
                </section>
            </CardBody>
            <hr className="border-t-gray-500"/>
            <CardFooter p="2" px={1} justify={'space-between'} w="full">
                <ButtonGroup className="justify-between" spacing="2" flexWrap={"wrap"}  w="full">
                    {info.github && (
                        <a href={info.github}>
                            <Button variant="solid" borderRadius={0}>
                                {t('move_to_github')}
                            </Button>
                        </a>
                    )}
                    {info.publish && (
                        <a href={info.publish}>
                            <Button variant="solid" borderRadius={0}>
                                {t('move_to_publish')}
                            </Button>
                        </a>
                    )}
                    <Link href={`/portfolio/${info.aid}`}>
                        <Button variant="solid" borderRadius={0}>
                            {t('detail')}
                        </Button>
                    </Link>
                </ButtonGroup>
            </CardFooter>
        </Card>
    );
};

export default PortfolioCard;
