import { useRouter } from "next/router";
import React from "react";
import { setCookie } from "typescript-cookie";
const setTokenFromOauth = () => {
    const router = useRouter();
    if (router.isReady) {
        const { slug } = router.query;
        setCookie("access", slug[0]);
        setCookie("refresh", slug[1]);
        router.replace("/")
    }
    return <></>;
};
export default setTokenFromOauth;
