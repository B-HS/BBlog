import PortfolioCard from "@/component/card/portfolioCard";
import dayjs from "dayjs";
import Head from "next/head";

const Portfolio = () => {
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
                {[0, 1, 2, 3, 4, 5, 6, 7].map((v) => (
                    <PortfolioCard key={v} info={{context:"test",hide:false, menu:"PORTFOLIO", tags:["1", "2","3"], title:"title", aid:51, startDate:dayjs("20230101").toString(), endDate:dayjs("20230202").toString(), publish:"https://hbyun.tistory.com", github:"https://hbyun.tistory.com" }} />
                ))}
            </section>
        </>
    );
};

export default Portfolio;
