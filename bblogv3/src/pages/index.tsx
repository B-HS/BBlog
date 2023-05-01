import { article } from "@/app";
import { Box, Flex } from "@chakra-ui/react";
import { Icon } from "@iconify/react";
import axios from "axios";
import dayjs from "dayjs";
import dompurify from "isomorphic-dompurify";
import Head from "next/head";

export const getStaticProps = async () => {
    const { data } = await axios.post("https://hyns.dev/v1/article/read", { aid: 1 });
    return {
        props: { article: data },
    };
};

interface homeProps {
    article: article;
}

const Home = ({ article }: homeProps) => {
    const sanitizer = dompurify.sanitize;
    return (
        <>
            <Head>
                <title>HS :: Intro</title>
                <meta name="description" content={`${article.context.replace(/<[^>]+>/g, "")}`} />
                <meta name="keywords" content="Developer homepage, Intropage, Resume" />
                <meta property="og:type" content="blog" />
                <meta property="og:url" content="https://hyns.dev" />
                <meta property="og:title" content="HS :: Intro" />
                <meta property="og:image" content="/favicon.ico" />
                <meta property="og:description" content={`${article.context.replace(/<[^>]+>/g, "")}`} />
                <meta property="og:site_name" content="Hyunseok" />
                <meta property="og:locale" content="ko_KR" />
            </Head>
            <Box className="" borderWidth="1px" borderColor={"#303030"} p={3} mt={5}>
                <Flex direction={"column"} gap={3}>
                    <Flex alignItems={"center"} gap={1}>
                        <Icon icon="uil:calender" />
                        <span className="text-sm text-gray-500 translate-y-[0.5px]">{dayjs(article.createdDate).locale("ko").format("YYYY MM  DD")}</span>
                    </Flex>
                    <div dangerouslySetInnerHTML={{ __html: sanitizer(article.context) }}></div>
                </Flex>
            </Box>
        </>
    );
};

export default Home;
