import { article as articleProps } from "@/app";
import Post from "@/component/article/post";
import Tags from "@/component/article/tags";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import Head from "next/head";
import { NextPageContext } from "next/types";

export const getServerSideProps = async (context: NextPageContext) => {
    const { slug } = context.query;
    const { data } = await axios.post("https://hyns.dev/v1/article/read", { aid: slug });
    const referer = context.req?.headers.referer;
    axios.post("https://hyns.dev/v1/visit/read", { aid: slug, visitUrl: referer ? referer : "LINK NOT CHECKED" + new Date().toString() });
    return { props: { article: data } };
};

const portfolioPost = (props: { article: articleProps; className: string }) => {
    const article = props.article;
    return (
        <>
            <Head>
                <title>{`HS :: ${article ? article.title : ""}`}</title>
                <meta name="description" content={`${article ? article.context.replace(/<[^>]+>/g, "") : ""}`} />
                <meta name="keywords" content={`${article ? article.tags.join(", ") : "blog"}`} />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content={`HS :: ${article ? article.title : ""}`} />
                <meta property="og:image" content={article ? article.thumbnail : "/favicon.ico"} />
                <meta property="og:description" content={`${article ? article.context.replace(/<[^>]+>/g, "") : ""}`} />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <Flex w="full" flexDirection={"column"} gap="2">
                <Flex borderWidth={1} borderColor={"GrayText"} w="full" flexDirection={"column"}>
                    <Post article={props.article} />
                    <Tags tags={props.article.tags} />
                </Flex>
            </Flex>
        </>
    );
};

export default portfolioPost;
