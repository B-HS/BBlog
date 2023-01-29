import { Badge, CircularProgress, Flex, Input, InputGroup, InputLeftElement, Tab, TabList, Tabs } from "@chakra-ui/react";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import ArticleCard from "../../Components/Card/ArticleCard";
import useInput from "../../Hook/useInput";
import { requestArticleCountByMenu, requestArticleList, requestMoreArticleList, requestMoreSearch, requestSearchList } from "../../Store/Async/articleAsync";
import { clearArticles, setSearchKeyword, setTabIndex } from "../../Store/Slice/articleSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { articleInfo, listRequest } from "../../Typings/type";

const Blog = () => {
    const { tabIndex, article, Loading, totalArticle, searchKeyword, frontCount, backCount, etcCount } = useAppSelector((state) => state.article);
    const [searchToggle, setSearchToggle] = useState<Boolean>(false);
    const [searchingSwtich, setSearchingSwtich] = useState<Boolean>(false);
    const [keywordsInput, onChangeKeywordsInput, setKeywordsInput] = useInput();
    const observeObj = useRef<HTMLDivElement>(null);
    const info = useRef<listRequest>({ page: 0, size: 5, total: 999 });
    const dispatch = useAppDispatch();

    const setToSearchingPage = (keyword: string) => {
        setSearchToggle(true);
        setSearchingSwtich(true);
        setKeywordsInput(keyword);
        stateClear(3);
        menu({ keyword: keywordsInput, page: info.current.page, size: info.current.size });
        dispatch(setSearchKeyword(null));
    };
    useEffect(() => {
        if (searchKeyword) {
            setToSearchingPage(searchKeyword);
        }
    }, [searchKeyword]);

    useEffect(() => {
        dispatch(requestArticleCountByMenu());
    }, [frontCount, backCount, etcCount]);

    const menuChangeEventor = (tab: number) => {
        switch (tab) {
            case 0:
                menu({ menu: "FRONTEND", page: info.current.page, size: info.current.size });
                break;
            case 1:
                menu({ menu: "BACKEND", page: info.current.page, size: info.current.size });
                break;
            case 2:
                menu({ menu: "ETC", page: info.current.page, size: info.current.size });
                break;
            case 3:
                menu({ keyword: keywordsInput, page: info.current.page, size: info.current.size });
                setSearchToggle(true);
                break;
            default:
                break;
        }
    };

    const stateClear = (num: number) => {
        info.current.page = 0;
        info.current.size = 5;
        info.current.total = 999;
        dispatch(clearArticles());
        dispatch(setTabIndex(num));
    };

    const menu = (menu: listRequest) => {
        if (info.current.page >= info.current.total || totalArticle == 0 || searchKeyword) {
            return;
        }
        if (tabIndex === 3) {
            if (keywordsInput.trim().length == 0) {
                return;
            }
            if (info.current.page == 0) {
                dispatch(requestSearchList(menu));
                info.current.page += 1;
                info.current.total = totalArticle;
                return;
            }
            dispatch(requestMoreSearch(menu));
            info.current.page += 1;
            info.current.total = totalArticle;
            return;
        }

        if (info.current.page == 0) {
            dispatch(requestArticleList(menu));
            info.current.page += 1;
            info.current.total = totalArticle;
            return;
        }

        dispatch(requestMoreArticleList(menu));
        info.current.page += 1;
        info.current.total = totalArticle;
    };

    useEffect(() => {
        const { current } = observeObj;
        if (!current) {
            return;
        }
        const obr = new IntersectionObserver((ele) => {
            if (ele[0].isIntersecting) {
                if (!searchingSwtich && tabIndex == 3) {
                    return;
                }
                menuChangeEventor(tabIndex);
            }
        });
        obr.observe(current);
        return () => {
            obr.unobserve(current);
        };
    }, [menu, totalArticle]);

    return (
        <>
            <Head>
                <title>HS :: Blog article list</title>
                <meta name="description" content="List of blog article" />
                <meta name="keywords" content="blog" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Blog article list" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content="Blog by Hyunseok byun" />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <section className="info_area mb-3 w-100">
                <Tabs index={tabIndex} colorScheme="purple">
                    <TabList className="mx-[0.05rem] ">
                        <Tab
                            onClick={() => {
                                stateClear(0);
                            }}
                        >
                            Frontend {<Badge bg={"transparent"} ml={1}>{frontCount}</Badge>}
                        </Tab>
                        <Tab
                            onClick={() => {
                                stateClear(1);
                            }}
                        >
                            Backend {<Badge bg={"transparent"} ml={1}>{backCount}</Badge>}
                        </Tab>
                        <Tab
                            onClick={() => {
                                stateClear(2);
                            }}
                        >
                            etc. {<Badge bg={"transparent"} ml={1}>{etcCount}</Badge>}
                        </Tab>
                        <Tab
                            onClick={() => {
                                setSearchToggle(true);
                                stateClear(3);
                            }}
                        >
                            <BsSearch color="gray.300" />
                        </Tab>
                    </TabList>
                </Tabs>
                {searchToggle && tabIndex === 3 && (
                    <section className="w-100 search flex self-end">
                        <InputGroup>
                            <InputLeftElement children={<BsSearch color="gray.300" />} />
                            <Input
                                w="100%"
                                onKeyDown={(e) => {
                                    if (e.key == "Enter") {
                                        setSearchingSwtich(true);
                                        stateClear(3);
                                        menu({ keyword: keywordsInput, page: info.current.page, size: info.current.size });
                                    }
                                }}
                                border={0}
                                type="text"
                                placeholder="전체 게시판 검색"
                                value={keywordsInput}
                                onChange={(e) => {
                                    dispatch(clearArticles());
                                    setSearchingSwtich(false);
                                    return onChangeKeywordsInput(e);
                                }}
                            />
                        </InputGroup>
                    </section>
                )}
            </section>
            <section className="article_area flex flex-col gap-10 p-2">
                {article.map((v: articleInfo) => (
                    <ArticleCard key={v.aid} info={v} tagSearch={setToSearchingPage} />
                ))}
                {!Loading && <div ref={observeObj}></div>}
                {Loading && (
                    <Flex width="w-screen" justifyContent={"center"}>
                        <CircularProgress isIndeterminate color="purple.300" />
                    </Flex>
                )}
            </section>
        </>
    );
};

export default Blog;
