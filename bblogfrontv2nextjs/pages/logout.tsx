import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Logout = () => {
    const router = useRouter();
    useEffect(() => {
        let timer = setTimeout(() => router.push("/"), 2000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <>
            <Head>
                <title>HS :: Logout</title>
                <meta name="description" content="Logout" />
                <meta name="keywords" content="Logout" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Logout" />
                <meta property="og:image" content="https://portfolio.hyns.co.kr/favicon.ico" />
                <meta property="og:description" content="Blog by Hyunseok byun" />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <section className="py-52 flex  flex-col items-center justify-center gap-3">
                <span className="font-bold text-3xl">로그아웃 되었습니다</span>
            </section>
        </>
    );
};

export default Logout;
