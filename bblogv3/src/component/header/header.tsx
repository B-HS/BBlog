import { authCheck } from "@/ajax/ajax";
import { AppDispatch, RootState } from "@/store/store";
import { Flex, Link, Text } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
    const { t } = useTranslation();
    const router = useRouter();
    const [auth, setAuth] = useState<boolean>(false);
    const [currentLocation, setCurrentLocation] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const globals = useSelector((state: RootState) => state.global);
    const routeCheck = async () => dispatch(authCheck());
    const authChecking = async () => routeCheck();
    useEffect(() => {
        authChecking();
        setCurrentLocation(window.location.href.split("/")[3]);
    }, [router]);

    useEffect(() => {
        setAuth(globals.auth);
    }, [globals.auth]);

    return (
        <Flex className="resume bg-opacity-10" alignItems={"baseline"} justify={"space-between"} position={"sticky"} top={0} py={3} borderBottom={"1px solid"} mb={5} px={2} zIndex={1000000} backgroundColor={"chakra-body-bg"}>
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
                <Link href="https://github.com/B-HS" aria-label="Redirect to Hyunseok's github">
                    <Icon icon="mdi:github" />
                </Link>
                {!auth && (
                    <Link as={NextLink} href="/login" aria-label="Redirect to login page">
                        <Icon icon="ri:login-box-line" />
                    </Link>
                )}
                {auth && (
                    <Link as={NextLink} href="/logout" aria-label="Redirect to logout page">
                        <Icon icon="ri:logout-box-line" />
                    </Link>
                )}
                {auth && (
                    <Link as={NextLink} href="/write" aria-label="Redirect to write page">
                        <Icon icon="mdi:pencil" />
                    </Link>
                )}
            </Flex>
        </Flex>
    );
};

export default Header;
