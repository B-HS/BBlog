import { CircularProgress, Flex } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect } from "react";
import PortfolioCard from "../../Components/Card/PortfolioCard";
import { requestArticleList } from "../../Store/Async/articleAsync";
import { clearArticles } from "../../Store/Slice/articleSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { listRequest } from "../../Typings/type";

const Portfolio = () => {
    const { article, Loading } = useAppSelector((state) => state.article);
    const dispatch = useAppDispatch();

    const menu = (menu: listRequest) => {
        dispatch(requestArticleList(menu));
    };

    useEffect(() => {
        menu({ menu: "PORTFOLIO", page: 0, size: 5 });
        return () => {
            dispatch(clearArticles());
        };
    }, []);
    return (
        <>
            <Head>
                <title>HS :: Portfolio list</title>
                <meta name="description" content="List of portfolio" />
                <meta name="keywords" content="portfolio" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Portfolio" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content="Blog by Hyunseok byun" />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <section className="portfolio_list grid grid-cols-fluid justify-items-center gap-6 p-2 mt-3">
                {Loading && (
                    <Flex width="w-screen" justifyContent={"center"}>
                        <CircularProgress isIndeterminate color="purple.300" />
                    </Flex>
                )}
                {!Loading && article.map((v) => <PortfolioCard key={v.aid} info={v} />)}
            </section>
        </>
    );
};

export default Portfolio;
