import { CircularProgress, Flex, Input, InputGroup, InputLeftElement, Tab, TabList, Tabs } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import ArticleCard from "../../Components/Card/ArticleCard";
import { requestArticleList, requestMoreArticleList } from "../../Store/Async/articleAsync";
import { clearArticles, setTabIndex } from "../../Store/Slice/articleSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { articleInfo, listRequest } from "../../Typings/type";

const Blog = () => {
    const { tabIndex, article, Loading, totalArticle } = useAppSelector((state) => state.article);
    const [searchToggle, setSearchToggle] = useState<Boolean>(false);
    const observeObj = useRef<HTMLDivElement>(null);
    const info = useRef<listRequest>({ page: 0, size: 5, total: 999 });
    const dispatch = useAppDispatch();

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
                setSearchToggle(true);
                // 검색세팅
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
        if (info.current.page > info.current.total) {
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
                menuChangeEventor(tabIndex);
            }
        });
        obr.observe(current);
        return () => {
            obr.unobserve(current);
        };
    }, [menu]);

    return (
        <>
            <section className="info_area mb-3 w-100">
                <Tabs index={tabIndex} colorScheme="purple">
                    <TabList className="mx-[0.05rem] ">
                        <Tab
                            onClick={() => {
                                stateClear(0);
                            }}
                        >
                            Frontend
                        </Tab>
                        <Tab
                            onClick={() => {
                                stateClear(1);
                            }}
                        >
                            Backend
                        </Tab>
                        <Tab
                            onClick={() => {
                                stateClear(2);
                            }}
                        >
                            etc.
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
                            <Input w="100%" border={0} type="text" placeholder="전체 게시판 검색" />
                        </InputGroup>
                    </section>
                )}
            </section>
            <section className="article_area flex flex-col gap-10 p-2">
                {article.map((v: articleInfo) => <ArticleCard key={v.aid} info={v} />)}
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
