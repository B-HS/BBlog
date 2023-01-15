import { CircularProgress, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import PortfolioCard from "../../Components/Card/PortfolioCard";
import { requestArticleList } from "../../Store/Async/articleAsync";
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
    }, []);
    return (
        <section className="portfolio_list grid grid-cols-fluid justify-items-center gap-6 p-2 mt-3">
            {Loading && (
                <Flex width="w-screen" justifyContent={"center"}>
                    <CircularProgress isIndeterminate color="purple.300" />
                </Flex>
            )}
            {!Loading && article.map((v) => <PortfolioCard key={v.aid} info={v} />)}
        </section>
    );
};

export default Portfolio;
