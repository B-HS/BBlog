import { Flex, Link, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


const Header = () => {
    const { t } = useTranslation();
    const [currentLocation, setCurrentLocation] = useState<string>("");
    const router = useRouter();
    useEffect(() => setCurrentLocation(window.location.href.split("/")[3]), [router]);

    return (
        <Flex className="resume bg-opacity-10" alignItems={"baseline"} justify={"space-between"} position={"sticky"} top={0} py={3} borderBottom={"1px solid"} mb={5} px={2}  zIndex={1000000} backgroundColor={'chakra-body-bg'}>
            <Flex alignItems={"baseline"} gap={2}>
                <Link as={NextLink} href="/">
                    <Flex className="title" alignItems={"baseline"} gap={1}>
                        <Text className="text-3xl tracking-tighter">{t("page_title")}</Text>
                        <Text fontSize={"x-small"}>v3</Text>
                    </Flex>
                </Link>
                <Flex className="menus text-sm gap-1">
                    <Link as={NextLink} href="/">
                        <Text className={`text-sm ${currentLocation == "" ? "font-extrabold border-b" : ""}`}>{t("introduce")}</Text>
                    </Link>
                    <Link as={NextLink} href="/blog">
                        <Text className={`text-sm ${currentLocation == "blog" ? "font-extrabold border-b" : ""}`}>{t("blog")}</Text>
                    </Link>
                    <Link as={NextLink} href="/portfolio">
                        <Text className={`text-sm ${currentLocation == "portfolio" ? "font-extrabold border-b" : ""}`}>{t("portfolio")}</Text>
                    </Link>
                </Flex>
            </Flex>
            <Flex className="icons text-xl gap-2 translate-y-0.5 align-baseline">
                <Link href="https://github.com/B-HS">
                    <Icon icon="mdi:github" />
                </Link>
                <Link as={NextLink} href="/login">
                    <Icon icon="ri:login-box-line" />
                </Link>
                {/* <Link as={NextLink} href="/logout">
                    <Icon icon="ri:logout-box-line" />
                </Link>
                <Link as={NextLink} href="/write">
                    <Icon icon="mdi:pencil" />
                </Link> */}
            </Flex>
        </Flex>
    );
};

export default Header;
