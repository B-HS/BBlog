import { CircularProgress, Flex, Input, InputGroup, InputLeftElement, Tab, TabList, Tabs } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import ArticleCard from "../../Components/Card/ArticleCard";
import { requestArticleList } from "../../Store/Async/articleAsync";
import { setTabIndex } from "../../Store/Slice/articleSlice";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { articleInfo, listRequest } from "../../Typings/type";

const Blog = () => {
    const { page, size, tabIndex, article, Loading } = useAppSelector((state) => state.article);
    const [searchToggle, setSearchToggle] = useState<Boolean>(false);
    const dispatch = useAppDispatch();
    const menu = (menu: listRequest) => {
        dispatch(requestArticleList(menu));
    };
    useEffect(() => {
        switch (tabIndex) {
            case 0:
                menu({ menu: "FRONTEND", page: page, size: size });
                break;
            case 1:
                menu({ menu: "BACKEND", page: page, size: size });
                break;
            case 2:
                menu({ menu: "ETC", page: page, size: size });
                break;
            case 3:
                // 검색세팅
                break;
            default:
                break;
        }
    }, [tabIndex]);

    return (
        <>
            <section className="info_area mb-3 w-100">
                <Tabs index={tabIndex} colorScheme="purple">
                    <TabList className="mx-[0.05rem] ">
                        <Tab
                            onClick={() => {
                                menu({ menu: "FRONTEND", page: 0, size: 5 });
                                dispatch(setTabIndex(0));
                            }}
                        >
                            Frontend
                        </Tab>
                        <Tab
                            onClick={() => {
                                menu({ menu: "BACKEND", page: 0, size: 5 });
                                dispatch(setTabIndex(1));
                            }}
                        >
                            Backend
                        </Tab>
                        <Tab
                            onClick={() => {
                                menu({ menu: "ETC", page: 0, size: 5 });
                                dispatch(setTabIndex(2));
                            }}
                        >
                            etc.
                        </Tab>
                        <Tab
                            onClick={() => {
                                setSearchToggle(true);
                                dispatch(setTabIndex(3));
                            }}
                        >
                            <BsSearch color="gray.300" />
                        </Tab>
                    </TabList>
                </Tabs>
                {searchToggle && tabIndex===3 &&(
                    <section className="w-100 search flex self-end">
                        <InputGroup>
                            <InputLeftElement children={<BsSearch color="gray.300" />} />
                            <Input w="100%" border={0} type="text" placeholder="전체 게시판 검색" />
                        </InputGroup>
                    </section>
                )}
            </section>
            <section className="article_area flex flex-col gap-10 p-2">
                {Loading && (
                    <Flex width="w-screen" justifyContent={"center"}>
                        <CircularProgress isIndeterminate color="purple.300" />
                    </Flex>
                )}
                {!Loading && article.map((v: articleInfo) => <ArticleCard key={v.aid} info={v} />)}
            </section>
        </>
    );
};

export default Blog;
