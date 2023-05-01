import { requestArticleList } from "@/ajax/ajax";
import ArticleCard from "@/component/card/articleCard";
import { resetArticleInfo } from "@/store/global/global";
import { AppDispatch, RootState } from "@/store/store";
import { CircularProgress, Flex, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

const Blog = () => {
    const { t } = useTranslation();
    const [tabIndex, setTabIndex] = useState<number>(0);
    const [loadText, setLoadText] = useState<string>(t("load_not_exist")!);
    const observeObj = useRef<HTMLDivElement>(null);
    const pg = useRef<number>(0);
    const globals = useSelector((state: RootState) => state.global);
    const dispatch = useDispatch<AppDispatch>();
    const menu = ["ALL", "DEV", "ETC"];
    const tabChange = (tabNum: number) => setTabIndex(tabNum);

    const loadArticles = (tabIndex: number) => {
        if (pg.current <= globals.total) {
            dispatch(requestArticleList({ page: pg.current, size: 10, menu: menu[tabIndex] }));
            pg.current += 1;
            setLoadText(t("loading")!);
        }
        setLoadText(t("load_not_exist")!);
    };

    useEffect(() => {
        pg.current = 0;
        dispatch(resetArticleInfo());
        loadArticles(tabIndex);
    }, [tabIndex]);

    useEffect(() => {
        const { current } = observeObj;
        if (!current) {
            return;
        }
        const obr = new IntersectionObserver((ele) => {
            if (ele[0].isIntersecting) loadArticles(tabIndex);
        });
        obr.observe(current);
        return () => {
            obr.unobserve(current);
        };
    }, [globals.total]);

    return (
        <Flex flexDirection={"column"} gap={3} alignItems={"flex-start"}>
            <Tabs index={tabIndex} variant="enclosed">
                <TabList className="custom-tab">
                    <Tab onClick={() => tabChange(0)}>{t("blog_all")}</Tab>
                    <Tab onClick={() => tabChange(1)}>{t("blog_dev")}</Tab>
                    <Tab onClick={() => tabChange(2)}>{t("blog_daily")}</Tab>
                </TabList>
            </Tabs>
            {globals.articles.map((val, idx) => (
                <ArticleCard key={idx} info={{ article: val }} />
            ))}
            {!globals.loading && (
                <div ref={observeObj} className="h-5">
                    {loadText}
                </div>
            )}
            {globals.loading && (
                <Flex w="full" justify={"center"}>
                    <CircularProgress isIndeterminate color="gray.500" />
                </Flex>
            )}
        </Flex>
    );
};

export default Blog;
