import { Input, InputGroup, InputLeftElement, Tab, TabList, Tabs } from "@chakra-ui/react";
import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
import ArticleCard from "../Components/Card/ArticleCard";

const Blog = () => {
    const [searchToggle, setSearchToggle] = useState<Boolean>(false);

    return (
        <>
            <section className="info_area mb-3 w-100">
                <Tabs colorScheme="purple">
                    <TabList className="mx-[0.05rem] ">
                        <Tab>Frontend</Tab>
                        <Tab>Backend</Tab>
                        <Tab>etc.</Tab>
                        <Tab
                            onClick={() => {
                                setSearchToggle(!searchToggle);
                            }}
                        >
                            <BsSearch color="gray.300" />
                        </Tab>
                    </TabList>
                </Tabs>
                {searchToggle && (
                    <section className="w-100 search flex self-end">
                        <InputGroup>
                            <InputLeftElement children={<BsSearch color="gray.300" />} />
                            <Input w="100%" border={0} type="text" placeholder="검색어" />
                        </InputGroup>
                    </section>
                )}
            </section>
            <section className="article_area flex flex-col gap-10 p-2">
                {Array.from({ length: 20 }).map((v, i) => (
                    <ArticleCard key={i} />
                ))}
            </section>
        </>
    );
};

export default Blog;
