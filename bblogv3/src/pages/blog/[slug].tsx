import { article as articleProps } from "@/app";
import CommentCard from "@/component/article/commentCard";
import CommentInput from "@/component/article/commentInput";
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

const blogPost = (props: { article: articleProps; className: string }) => {
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
                    <CommentInput />
                </Flex>
                <Flex borderWidth={1} borderColor={"GrayText"} w="full" flexDirection={"column"}>
                    {[0, 1, 2, 3, 4, 5].map((val) => (
                        <CommentCard comment={{ aid: 1, commentDesc: "TEST", commentGroup: 0, commentImg: "https://mi.gumyo.net/proxy/avatar.webp?url=https%3A%2F%2Fmi.gumyo.net%2Ffiles%2F47df371c-ec7f-4579-ac93-ca32fd25d54b&avatar=1", commentSort: 0, nickname: "TEST", uploadedDated:new Date("2023-01-01") }} />
                    ))}
                </Flex>
            </Flex>
        </>
    );
};

export default blogPost;
