import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { setCookie } from "typescript-cookie";
const setTokenFromOauth = () => {
    const router = useRouter();
    if (router.isReady) {
        const { slug } = router.query;
        setCookie("access", slug[0]);
        setCookie("refresh", slug[1]);
        router.replace("/");
    }
    return (
        <>
            <Head>
                <title>HS :: Token</title>
                <meta name="description" content={`Token`} />
                <meta name="keywords" content="TOKEN" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: TOKEN" />
                <meta property="og:image" content="https://portfolio.hyns.co.kr/favicon.ico" />
                <meta property="og:description" content={`Token`} />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
        </>
    );
};
export default setTokenFromOauth;
