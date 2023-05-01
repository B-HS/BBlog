import { requestArticleList } from "@/ajax/ajax";
import PortfolioCard from "@/component/card/portfolioCard";
import { resetArticleInfo } from "@/store/global/global";
import { AppDispatch, RootState } from "@/store/store";
import dayjs from "dayjs";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Portfolio = () => {
    const dispatch = useDispatch<AppDispatch>();
    const globals = useSelector((state: RootState) => state.global);
    useEffect(() => {
        dispatch(requestArticleList({ page: 0, size: 100, menu: "PORTFOLIO" }));
        return ()=>{
            dispatch(resetArticleInfo)
        }
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
                {globals.articles.map((v, idx) => (
                    <PortfolioCard key={idx} info={v} />
                ))}
            </section>
        </>
    );
};

export default Portfolio;
