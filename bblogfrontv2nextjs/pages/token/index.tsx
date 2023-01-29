import Head from "next/head";
import React from "react";

const tokenBlank = () => {
    return (
        <>
            <Head>
                <title>HS :: Token</title>
                <meta name="description" content={`Token`} />
                <meta name="keywords" content="TOKEN" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: TOKEN" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content={`Token`} />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
        </>
    );
};

export default tokenBlank;
