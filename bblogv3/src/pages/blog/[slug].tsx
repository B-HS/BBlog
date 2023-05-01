import { authCheck, requestCommentList } from "@/ajax/ajax";
import { article as articleProps } from "@/app";
import CommentCard from "@/component/article/commentCard";
import CommentInput from "@/component/article/commentInput";
import Post from "@/component/article/post";
import Tags from "@/component/article/tags";
import { resetCommentInfo } from "@/store/global/global";
import { AppDispatch, RootState } from "@/store/store";
import { Flex } from "@chakra-ui/react";
import axios from "axios";
import { t } from "i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { NextPageContext } from "next/types";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const getServerSideProps = async (context: NextPageContext) => {
    const { slug } = context.query;
    const { data } = await axios.post("https://hyns.dev/v1/article/read", { aid: slug });
    const referer = context.req?.headers.referer;
    axios.post("https://hyns.dev/v1/visit/read", { aid: slug, visitUrl: referer ? referer : "LINK NOT CHECKED" + new Date().toString() });
    return { props: { article: data } };
};

const blogPost = (props: { article: articleProps; slug: string }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [loadText, setLoadText] = useState<string>(t("load_not_exist")!);
    const pg = useRef<number>(0);
    const observeObj = useRef<HTMLDivElement>(null);
    const globals = useSelector((state: RootState) => state.global);
    const router = useRouter();
    const article = props.article;

    const loadComment = () => {
        if (pg.current <= globals.commentTotal) {
            dispatch(requestCommentList({ page: pg.current, size: 10, aid: router.query.slug as string }));
            pg.current += 1;
            setLoadText(t("loading")!);
        }
        setLoadText(t("load_not_exist")!);
    };

    useEffect(() => {
        const { current } = observeObj;
        if (!current) {
            return;
        }
        const obr = new IntersectionObserver((ele) => {
            if (ele[0].isIntersecting) loadComment();
        });
        obr.observe(current);
        return () => {
            obr.unobserve(current);
        };
    }, [globals.commentTotal]);

    useEffect(() => {
        dispatch(authCheck())
        return () => {
            dispatch(resetCommentInfo());
        };
    }, []);

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
                    {globals.comments.map((val, idx) => (
                        <CommentCard comment={val} key={idx} />
                    ))}
                </Flex>
                <div ref={observeObj} className="h-5">
                    {loadText}
                </div>
            </Flex>
        </>
    );
};

export default blogPost;
